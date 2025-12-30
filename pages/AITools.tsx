
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { 
  Zap, 
  Send, 
  Copy, 
  RotateCcw, 
  Youtube, 
  Instagram, 
  Twitter, 
  Video, 
  Image as ImageIcon, 
  MessageSquare,
  FileVideo,
  FileImage,
  Loader2,
  Bot,
  User
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const AITools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'vision' | 'chat'>('content');
  
  // Content Engine State
  const [inputText, setInputText] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);

  // Vision State
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [visionAnalysis, setVisionAnalysis] = useState('');
  const [isVisionLoading, setIsVisionLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (activeTab === 'chat' && !chatSessionRef.current) {
      chatSessionRef.current = geminiService.createChatSession();
    }
    scrollToBottom();
  }, [activeTab, messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOptimize = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const result = await geminiService.optimizeContent(inputText, platform);
    setOutput(result);
    setIsLoading(false);
  };

  const handleSuggestTitles = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    const result = await geminiService.suggestVideoTitles(inputText);
    setTitles(result);
    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeMedia = async () => {
    if (!mediaPreview || !mediaFile) return;
    setIsVisionLoading(true);
    const base64 = mediaPreview.split(',')[1];
    const prompt = mediaFile.type.startsWith('video/') 
      ? "Analyze this video. Provide key takeaways, hook strength, and suggestions for improvement."
      : "Analyze this image. What is the composition? How could it be better for a social media thumbnail or post?";
    
    const result = await geminiService.analyzeMedia(base64, mediaFile.type, prompt);
    setVisionAnalysis(result);
    setIsVisionLoading(false);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">AI Studio</h2>
          <p className="text-zinc-400">Harness Gemini 3 Pro to amplify your creativity.</p>
        </div>
        
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
          {[
            { id: 'content', label: 'Content Engine', icon: <Zap size={16} /> },
            { id: 'vision', label: 'Media Lab', icon: <Video size={16} /> },
            { id: 'chat', label: 'Chat Assistant', icon: <MessageSquare size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content Engine Tab */}
      {activeTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" /> Content Engine
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Target Platform</label>
                <div className="flex gap-2">
                  {[
                    { name: 'YouTube', icon: <Youtube size={16} /> },
                    { name: 'Instagram', icon: <Instagram size={16} /> },
                    { name: 'Twitter/X', icon: <Twitter size={16} /> },
                  ].map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setPlatform(p.name)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border transition-all text-sm font-medium ${
                        platform === p.name 
                        ? 'bg-blue-600/10 border-blue-500 text-blue-400' 
                        : 'border-white/10 hover:border-white/20 text-zinc-400'
                      }`}
                    >
                      {p.icon} {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Draft Content / Idea</label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your script, caption, or video idea here..."
                  className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleOptimize}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {isLoading ? <RotateCcw className="animate-spin" /> : <Send size={18} />}
                  Optimize
                </button>
                <button
                  onClick={handleSuggestTitles}
                  disabled={isLoading}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/5"
                >
                  Get Titles
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {output ? (
              <div className="glass p-6 rounded-3xl animate-in slide-in-from-right-4 duration-500">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Optimized Output</h3>
                  <button onClick={() => copyToClipboard(output)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white">
                    <Copy size={18} />
                  </button>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 prose prose-invert max-w-none text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {output}
                </div>
              </div>
            ) : titles.length > 0 ? (
              <div className="glass p-6 rounded-3xl animate-in slide-in-from-right-4 duration-500">
                <h3 className="font-bold mb-4">Suggested Titles</h3>
                <div className="space-y-3">
                  {titles.map((title, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/50 transition-colors">
                      <span className="text-sm text-zinc-200">{title}</span>
                      <button onClick={() => copyToClipboard(title)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded text-zinc-400 transition-all">
                        <Copy size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center glass rounded-3xl p-12 text-center text-zinc-500 min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Zap size={32} />
                </div>
                <p className="max-w-[240px]">Enter your content ideas to see AI suggestions here.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vision Tab (Video/Image Understanding) */}
      {activeTab === 'vision' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Video size={24} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Media Lab</h3>
                  <p className="text-sm text-zinc-500">Video & Image Understanding</p>
                </div>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group relative overflow-hidden min-h-[280px] flex flex-col items-center justify-center"
              >
                {mediaPreview ? (
                  mediaFile?.type.startsWith('video/') ? (
                    <div className="space-y-4">
                      <FileVideo size={48} className="mx-auto text-blue-400" />
                      <p className="text-sm font-medium text-white">{mediaFile.name}</p>
                    </div>
                  ) : (
                    <img src={mediaPreview} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                  )
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <FileVideo size={32} className="text-zinc-500 group-hover:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-300">Upload Media</p>
                      <p className="text-xs text-zinc-500">Supports Video or Image files</p>
                    </div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*,video/*" 
                  onChange={handleFileChange}
                />
              </div>

              <button
                onClick={analyzeMedia}
                disabled={!mediaFile || isVisionLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:grayscale text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all"
              >
                {isVisionLoading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                Analyze Media with Gemini 3 Pro
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 min-h-[400px] flex flex-col">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Bot size={20} className="text-blue-400" /> Analysis Report
              </h3>
              
              {visionAnalysis ? (
                <div className="prose prose-invert max-w-none text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed overflow-y-auto max-h-[500px] animate-in fade-in duration-700">
                  {visionAnalysis}
                </div>
              ) : isVisionLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap size={14} className="text-blue-400 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-sm font-medium animate-pulse">Scanning media content...</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <ImageIcon size={32} />
                  </div>
                  <p className="max-w-[280px]">Upload a thumbnail or a video clip to get professional creative feedback.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="glass rounded-3xl flex flex-col h-[700px] overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
                <Bot size={22} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold">Creator Assistant</h3>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Gemini 3 Pro Powered
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 gap-4">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <p className="font-bold text-zinc-300 text-lg">Your AI Strategist</p>
                  <p className="max-w-[320px] text-sm mt-1">Ask me anything about video ideas, branding, sponsorship deals, or analytics trends.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {['Video Hook Ideas', 'Brand Deal Tips', 'SEO Strategies', 'Growth Audit'].map(tip => (
                    <button 
                      key={tip} 
                      onClick={() => setChatInput(tip)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors"
                    >
                      {tip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white ${
                    msg.role === 'user' ? 'bg-zinc-700' : 'bg-blue-600'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><Bot size={16} /></div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-100"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 border-t border-white/10 bg-white/[0.01]">
            <div className="flex gap-4">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask your Creator Assistant..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!chatInput.trim() || isChatLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all shrink-0"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;
