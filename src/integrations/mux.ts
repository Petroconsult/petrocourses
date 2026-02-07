/**
 * Mux Video Integration
 * Service for managing video hosting and playback
 * Docs: https://docs.mux.com
 */

export interface MuxVideoUploadPayload {
  filename: string;
  cors_origin?: string;
}

export interface MuxVideo {
  id: string;
  playbackId: string;
  status: "preparing" | "ready" | "errored";
  duration?: number;
  createdAt: string;
  thumbnail?: string;
}

export interface MuxPlaybackUrl {
  url: string;
  playbackId: string;
  token?: string;
}

export interface MuxResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Mux client wrapper
 * Requires: MUX_TOKEN_ID and MUX_TOKEN_SECRET
 */
class MuxService {
  private tokenId: string;
  private tokenSecret: string;
  private baseUrl = "https://api.mux.com";

  constructor() {
    this.tokenId = process.env.MUX_TOKEN_ID || "";
    this.tokenSecret = process.env.MUX_TOKEN_SECRET || "";

    if (!this.tokenId || !this.tokenSecret) {
      console.warn("Mux credentials not fully configured");
    }
  }

  /**
   * Get authorization header for Mux API
   */
  private getAuthHeader(): string {
    const credentials = `${this.tokenId}:${this.tokenSecret}`;
    const encoded = Buffer.from(credentials).toString("base64");
    return `Basic ${encoded}`;
  }

  /**
   * Create a video upload
   */
  async createUpload(
    payload: MuxVideoUploadPayload
  ): Promise<MuxResponse<{ uploadId: string; uploadUrl: string }>> {
    if (!this.tokenId || !this.tokenSecret) {
      return { success: false, error: "Mux not configured" };
    }

    try {
      const response = await fetch(`${this.baseUrl}/video/v1/uploads`, {
        method: "POST",
        headers: {
          Authorization: this.getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_asset_settings: {
            playback_policy: ["public"],
            encoding_tier: "baseline",
          },
          cors_origin: payload.cors_origin,
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return { success: false, error: data.error?.messages?.[0] };
      }

      return {
        success: true,
        data: {
          uploadId: data.data.id,
          uploadUrl: data.data.url,
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
   * Get video details by ID
   */
  async getVideo(videoId: string): Promise<MuxResponse<MuxVideo>> {
    if (!this.tokenId || !this.tokenSecret) {
      return { success: false, error: "Mux not configured" };
    }

    try {
      const response = await fetch(`${this.baseUrl}/video/v1/assets/${videoId}`, {
        method: "GET",
        headers: {
          Authorization: this.getAuthHeader(),
        },
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return { success: false, error: data.error?.messages?.[0] };
      }

      return {
        success: true,
        data: {
          id: data.data.id,
          playbackId: data.data.playback_ids?.[0]?.id || "",
          status: data.data.status,
          duration: data.data.duration,
          createdAt: data.data.created_at,
          thumbnail: `https://image.mux.com/${data.data.playback_ids?.[0]?.id}/thumbnail.jpg`,
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
   * Get playback URL for video
   */
  async getPlaybackUrl(playbackId: string): Promise<MuxPlaybackUrl> {
    return {
      url: `https://stream.mux.com/${playbackId}.m3u8`,
      playbackId,
    };
  }

  /**
   * Delete a video
   */
  async deleteVideo(videoId: string): Promise<MuxResponse<null>> {
    if (!this.tokenId || !this.tokenSecret) {
      return { success: false, error: "Mux not configured" };
    }

    try {
      const response = await fetch(`${this.baseUrl}/video/v1/assets/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: this.getAuthHeader(),
        },
      });

      if (!response.ok) {
        const data = await response.json() as any;
        return { success: false, error: data.error?.messages?.[0] };
      }

      return { success: true, data: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get thumbnail URL for video
   */
  getThumbnailUrl(playbackId: string, options?: {
    time?: number;
    width?: number;
    height?: number;
  }): string {
    let url = `https://image.mux.com/${playbackId}/thumbnail.jpg`;

    if (options?.time) {
      url += `?time=${options.time}`;
    }
    if (options?.width) {
      url += `${url.includes("?") ? "&" : "?"}width=${options.width}`;
    }
    if (options?.height) {
      url += `${url.includes("?") ? "&" : "?"}height=${options.height}`;
    }

    return url;
  }

  /**
   * Create a signed URL for private video access
   * Useful for gating video access
   */
  async createSignedUrl(
    playbackId: string,
    expiresIn: number = 3600
  ): Promise<string> {
    // This is a placeholder - actual implementation depends on your auth strategy
    // For now, just return the standard playback URL
    // Consider using Mux token signing or your own signing strategy
    return `https://stream.mux.com/${playbackId}.m3u8`;
  }
}

// Singleton instance
let muxInstance: MuxService | null = null;

export const getMuxService = (): MuxService => {
  if (!muxInstance) {
    muxInstance = new MuxService();
  }
  return muxInstance;
};

export default MuxService;
