
import { GoogleGenAI, Type, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async optimizeContent(text: string, platform: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Optimize this content for ${platform}. Make it highly engaging for the target audience: "${text}"`,
        config: {
          systemInstruction: "You are a world-class social media strategist who specializes in viral content for YouTube, Instagram, and TikTok.",
          temperature: 0.7,
        },
      });
      return response.text || "Failed to generate optimization suggestions.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while communicating with the AI.";
    }
  }

  async analyzeMedia(base64Data: string, mimeType: string, prompt: string): Promise<string> {
    try {
      // Use gemini-3-pro-preview for complex visual/video tasks
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
        config: {
          systemInstruction: "You are an expert content analyst. You analyze videos and images to provide creators with actionable insights, hook improvements, and quality assessments.",
        },
      });
      return response.text || "Analysis failed.";
    } catch (error) {
      console.error("Gemini Vision Error:", error);
      return "Failed to analyze media. Please ensure the file size is within limits.";
    }
  }

  createChatSession() {
    return this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are CreatorAssistant, an AI helper for CreatorOS. You help creators with video ideas, sponsorship negotiation tips, analytics interpretation, and platform growth strategies. Be concise, encouraging, and data-driven.",
      },
    });
  }

  async suggestVideoTitles(topic: string): Promise<string[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 click-worthy video titles for a YouTube video about: ${topic}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      
      const text = response.text.trim();
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      return ["Default Title 1", "Default Title 2"];
    }
  }
}

export const geminiService = new GeminiService();
