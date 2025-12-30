
import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  Youtube, 
  Instagram, 
  Play, 
  TrendingUp, 
  Users, 
  Heart, 
  Share2, 
  MessageCircle, 
  Eye, 
  ThumbsUp, 
  MessageSquare,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  AlertTriangle,
  Lightbulb,
  Sparkles
} from 'lucide-react';

// Mock data generator for different time periods
const generateData = (range: string) => {
  const points = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const labelPrefix = range === '7d' ? 'Day ' : range === '30d' ? 'Wk ' : 'Mo ';
  
  return Array.from({ length: points > 12 ? 12 : points }).map((_, i) => ({
    name: `${labelPrefix}${i + 1}`,
    period: range === '7d' ? `Day ${i + 1} of Period` : range === '30d' ? `Week ${i + 1}` : `Month ${i + 1}`,
    views: Math.floor(Math.random() * 50000) + 10000,
    interactions: Math.floor(Math.random() * 5000) + 500,
  }));
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#18181b] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 min-w-[200px]">
        <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
          <Calendar size={12} className="text-zinc-500" />
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            {data.period || label}
          </p>
        </div>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs font-bold text-zinc-300 capitalize">{entry.name}:</span>
              </div>
              <span className="text-sm font-black text-white">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Analytics: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState('Total');
  const [dateRange, setDateRange] = useState('30d');
  const [isRangeOpen, setIsRangeOpen] = useState(false);

  const platforms = [
    { name: 'Total', icon: <TrendingUp size={18} />, color: 'blue' },
    { name: 'YouTube', icon: <Youtube size={18} />, color: 'red' },
    { name: 'Instagram', icon: <Instagram size={18} />, color: 'pink' },
    { name: 'TikTok', icon: <Play size={18} />, color: 'teal' },
  ];

  const rangeOptions = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: 'custom', label: 'Custom Range' },
  ];

  const currentChartData = useMemo(() => generateData(dateRange), [dateRange]);

  const ytMetrics = [
    { label: 'Channel Views', value: '4.2M', subValue: '+12% vs prev', icon: <Eye size={20} className="text-red-500" /> },
    { label: 'Video Likes', value: '128.4k', subValue: '+5.2% vs prev', icon: <ThumbsUp size={20} className="text-red-500" /> },
    { label: 'Comments', value: '14.2k', subValue: '+8.1% vs prev', icon: <MessageSquare size={20} className="text-red-500" /> },
    { label: 'Total Shares', value: '32.1k', subValue: '+15.4% vs prev', icon: <Share2 size={20} className="text-red-500" /> },
  ];

  const ytRecommendations = [
    {
      type: 'alert',
      title: 'Retention Dip Detected',
      description: 'Your average view duration dropped by 18% on your last "Tech Review" video. Check the segment at 03:45.',
      icon: <AlertTriangle size={18} className="text-amber-400" />,
      borderColor: 'border-amber-500/20',
      bgColor: 'bg-amber-500/5'
    },
    {
      type: 'opportunity',
      title: 'Growth Opportunity',
      description: 'Keywords related to "Creator Tools" are currently trending for your audience. Plan a tutorial series.',
      icon: <Lightbulb size={18} className="text-blue-400" />,
      borderColor: 'border-blue-500/20',
      bgColor: 'bg-blue-500/5'
    },
    {
      type: 'suggestion',
      title: 'AI Posting Schedule',
      description: 'Your subscribers are most active between 6 PM - 8 PM EST. Consider shifting your Saturday uploads.',
      icon: <Sparkles size={18} className="text-purple-400" />,
      borderColor: 'border-purple-500/20',
      bgColor: 'bg-purple-500/5'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-zinc-400">Deep dive into your performance metrics and growth trends.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
            {platforms.map(p => (
              <button
                key={p.name}
                onClick={() => setActivePlatform(p.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activePlatform === p.name ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {p.icon} <span className="hidden sm:inline">{p.name}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsRangeOpen(!isRangeOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold text-zinc-300 hover:text-white hover:border-white/20 transition-all"
            >
              <Calendar size={18} className="text-blue-400" />
              {rangeOptions.find(o => o.id === dateRange)?.label}
              <ChevronDown size={16} className={`transition-transform duration-200 ${isRangeOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isRangeOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsRangeOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 glass rounded-2xl p-2 z-20 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
                  {rangeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setDateRange(option.id);
                        setIsRangeOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        dateRange === option.id 
                          ? 'bg-blue-600 text-white' 
                          : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Followers gained', value: '24.5k', icon: <Users size={20} className="text-blue-400" /> },
          { label: 'Total Engagement', value: '1.4M', icon: <Heart size={20} className="text-rose-400" /> },
          { label: 'Platform Reach', value: '82.1k', icon: <Share2 size={20} className="text-teal-400" /> },
          { label: 'Global Mentions', value: '12.4k', icon: <MessageCircle size={20} className="text-indigo-400" /> },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                {stat.icon}
              </div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">View Velocity</h3>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Traffic Intensity</div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} content={<CustomTooltip />} />
                <Bar 
                  name="Views"
                  dataKey="views" 
                  fill="#3b82f6" 
                  radius={[6, 6, 0, 0]} 
                  barSize={dateRange === '7d' ? 40 : 25} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Interaction Trend</h3>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Active Engagement</div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  name="Interactions"
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="#e1306c" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#e1306c', strokeWidth: 2, stroke: '#0a0a0a' }} 
                  activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} 
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Youtube className="text-red-500" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">YouTube Performance</h3>
              <p className="text-sm text-zinc-500">Video-level insights and AI suggestions</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors group">
            Export Report <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ytMetrics.map((metric, i) => (
            <div key={i} className="glass p-6 rounded-3xl border border-white/5 hover:border-red-500/20 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-red-500/5 group-hover:bg-red-500/10 transition-colors">
                  {metric.icon}
                </div>
                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  {metric.subValue.split(' ')[0]}
                </div>
              </div>
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{metric.label}</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-bold">{metric.value}</h4>
                  <span className="text-[10px] text-zinc-600 font-medium">{dateRange === '7d' ? 'wk' : 'mo'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Alerts & Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ytRecommendations.map((rec, i) => (
            <div key={i} className={`glass p-5 rounded-2xl border ${rec.borderColor} ${rec.bgColor} flex flex-col gap-3 transition-transform hover:scale-[1.01]`}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/5">
                  {rec.icon}
                </div>
                <h5 className="font-bold text-sm tracking-tight">{rec.title}</h5>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {rec.description}
              </p>
              <button className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors mt-auto pt-2 flex items-center gap-1">
                Take Action <ArrowUpRight size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Bonus: Content Health Score */}
        <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h4 className="font-bold">Creator Health Score</h4>
            <p className="text-sm text-zinc-400">Your composite score based on audience retention, CTR, and sentiment for {dateRange === '7d' ? 'last week' : 'last month'}.</p>
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="45" className="text-red-500" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black">82</span>
              <span className="text-[8px] uppercase tracking-widest text-zinc-500">Global</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
