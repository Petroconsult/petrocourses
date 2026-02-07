/**
 * OpenAI Integration
 * Service for LLM interactions (ChatGPT, embeddings, etc.)
 * Docs: https://platform.openai.com
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatCompletionPayload {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system?: string;
}

export interface ChatCompletionResponse {
  success: boolean;
  message?: string;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
  error?: string;
}

export interface EmbeddingPayload {
  text: string;
}

export interface EmbeddingResponse {
  success: boolean;
  embedding?: number[];
  error?: string;
}

/**
 * OpenAI client wrapper
 * Requires: OPENAI_API_KEY
 */
class OpenAIService {
  private apiKey: string;
  private baseUrl = "https://api.openai.com/v1";
  private model = "gpt-4-turbo";
  private embeddingModel = "text-embedding-3-small";

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || "";

    if (!this.apiKey) {
      console.warn("OPENAI_API_KEY not configured");
    }
  }

  /**
   * Send a chat completion request
   */
  async chat(payload: ChatCompletionPayload): Promise<ChatCompletionResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: "OpenAI API key not configured",
      };
    }

    try {
      const messages: ChatMessage[] = [];

      // Add system message if provided
      if (payload.system) {
        messages.push({
          role: "system",
          content: payload.system,
        });
      }

      messages.push(...payload.messages);

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: payload.model || this.model,
          messages,
          temperature: payload.temperature ?? 0.7,
          max_tokens: payload.max_tokens ?? 1000,
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message || "Failed to get chat completion",
        };
      }

      return {
        success: true,
        message: data.choices?.[0]?.message?.content,
        tokens: {
          prompt: data.usage?.prompt_tokens || 0,
          completion: data.usage?.completion_tokens || 0,
          total: data.usage?.total_tokens || 0,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get embeddings for text
   */
  async getEmbedding(payload: EmbeddingPayload): Promise<EmbeddingResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: "OpenAI API key not configured",
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.embeddingModel,
          input: payload.text,
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message || "Failed to get embeddings",
        };
      }

      return {
        success: true,
        embedding: data.data?.[0]?.embedding,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Chatbot specific: Answer a question based on course context
   */
  async answerCourseQuestion(
    question: string,
    courseContext: string,
    conversationHistory: ChatMessage[] = []
  ): Promise<ChatCompletionResponse> {
    const systemPrompt = `You are a helpful assistant for PetroCourses. You help students with questions about petroleum, courses, and training materials.
    
Course Context:
${courseContext}

Always be professional, accurate, and stay within the context provided. If the question is outside the scope of the course, politely redirect the user.`;

    const messages: ChatMessage[] = [
      ...conversationHistory,
      {
        role: "user",
        content: question,
      },
    ];

    return this.chat({
      messages,
      system: systemPrompt,
      temperature: 0.7,
      max_tokens: 500,
    });
  }

  /**
   * Generate a quiz question based on lesson content
   */
  async generateQuizQuestion(lessonContent: string): Promise<ChatCompletionResponse> {
    const systemPrompt = `Generate a multiple choice quiz question based on the following lesson content. 
Format your response as JSON with this structure:
{
  "question": "...",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "..."
}`;

    return this.chat({
      messages: [
        {
          role: "user",
          content: `Generate a quiz question for this lesson:\n\n${lessonContent}`,
        },
      ],
      system: systemPrompt,
      temperature: 0.5,
      max_tokens: 800,
    });
  }

  /**
   * Summarize course content
   */
  async summarizeContent(content: string): Promise<ChatCompletionResponse> {
    return this.chat({
      messages: [
        {
          role: "user",
          content: `Please summarize the following content concisely:\n\n${content}`,
        },
      ],
      system: "You are an expert at summarizing technical content clearly and concisely.",
      temperature: 0.5,
      max_tokens: 500,
    });
  }
}

// Singleton instance
let openaiInstance: OpenAIService | null = null;

export const getOpenAIService = (): OpenAIService => {
  if (!openaiInstance) {
    openaiInstance = new OpenAIService();
  }
  return openaiInstance;
};

export default OpenAIService;
