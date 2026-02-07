/**
 * AWS S3 Integration
 * Service for file storage and retrieval
 * Docs: https://aws.amazon.com/s3/
 */

import crypto from "crypto";

export interface S3UploadPayload {
  key: string;
  contentType: string;
  body: Buffer | string;
  isPublic?: boolean;
  metadata?: Record<string, string>;
}

export interface S3SignedUrlPayload {
  key: string;
  expiresIn?: number; // seconds
  contentType?: string;
}

export interface S3FileMetadata {
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
  contentType?: string;
  url: string;
}

export interface S3Response<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * S3 client wrapper
 * Requires: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET, AWS_REGION
 */
class S3Service {
  private accessKeyId: string;
  private secretAccessKey: string;
  private bucket: string;
  private region: string;
  private baseUrl: string;

  constructor() {
    this.accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
    this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
    this.bucket = process.env.AWS_S3_BUCKET || "";
    this.region = process.env.AWS_REGION || "us-east-1";
    this.baseUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com`;

    if (!this.accessKeyId || !this.secretAccessKey || !this.bucket) {
      console.warn("AWS S3 credentials not fully configured");
    }
  }

  /**
   * Generate AWS Signature V4
   */
  private generateSignature(
    method: string,
    path: string,
    query?: Record<string, string>,
    payload?: string
  ): { headers: Record<string, string>; url: string } {
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z";
    const dateStamp = now.toISOString().split("T")[0].replace(/-/g, "");

    const host = `${this.bucket}.s3.${this.region}.amazonaws.com`;
    const credentialScope = `${dateStamp}/${this.region}/s3/aws4_request`;

    // Canonical request
    const queryString = query
      ? Object.entries(query)
          .sort()
          .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
          .join("&")
      : "";
    const canonicalUri = path;
    const canonicalQuerystring = queryString;
    const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${this.sha256("")}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = "host;x-amz-content-sha256;x-amz-date";

    const canonicalRequest = [
      method,
      canonicalUri,
      canonicalQuerystring,
      canonicalHeaders,
      signedHeaders,
      this.sha256(payload || ""),
    ].join("\n");

    // String to sign
    const canonicalRequestHash = this.sha256(canonicalRequest);
    const stringToSign = [
      "AWS4-HMAC-SHA256",
      amzDate,
      credentialScope,
      canonicalRequestHash,
    ].join("\n");

    // Calculate signature
    const kDate = this.hmac(
      `AWS4${this.secretAccessKey}`,
      dateStamp,
      "utf-8"
    );
    const kRegion = this.hmac(kDate, this.region, "binary");
    const kService = this.hmac(kRegion, "s3", "binary");
    const kSigning = this.hmac(kService, "aws4_request", "binary");
    const signature = this.hmac(kSigning, stringToSign, "binary").toString(
      "hex"
    );

    const headers: Record<string, string> = {
      Host: host,
      "x-amz-date": amzDate,
      "x-amz-content-sha256": this.sha256(payload || ""),
      Authorization: `AWS4-HMAC-SHA256 Credential=${this.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    };

    const url = `${this.baseUrl}${path}${queryString ? `?${queryString}` : ""}`;
    return { headers, url };
  }

  /**
   * SHA256 hash
   */
  private sha256(data: string): string {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  /**
   * HMAC
   */
  private hmac(
    key: string | Buffer,
    data: string,
    encoding: BufferEncoding = "utf-8"
  ): Buffer {
    return crypto.createHmac("sha256", key).update(data, encoding).digest();
  }

  /**
   * Upload a file to S3
   */
  async upload(payload: S3UploadPayload): Promise<S3Response<S3FileMetadata>> {
    if (!this.accessKeyId || !this.secretAccessKey || !this.bucket) {
      return { success: false, error: "AWS S3 not configured" };
    }

    try {
      const body =
        typeof payload.body === "string"
          ? Buffer.from(payload.body, "utf-8")
          : payload.body;

      const sig = this.generateSignature("PUT", `/${payload.key}`, undefined);

      const response = await fetch(sig.url, {
        method: "PUT",
        headers: {
          ...sig.headers,
          "Content-Type": payload.contentType,
          ...(payload.isPublic && { "x-amz-acl": "public-read" }),
          ...(payload.metadata && {
            "x-amz-metadata": JSON.stringify(payload.metadata),
          }),
        },
        body,
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Upload failed: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: {
          key: payload.key,
          size: body.length,
          lastModified: new Date(),
          etag: response.headers.get("etag") || "",
          contentType: payload.contentType,
          url: payload.isPublic
            ? `${this.baseUrl}/${payload.key}`
            : `${this.baseUrl}/${payload.key}`,
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
   * Generate a signed URL for downloading a file
   */
  generateSignedUrl(payload: S3SignedUrlPayload): string {
    const expiresIn = payload.expiresIn || 3600; // 1 hour default
    const now = new Date();
    const expires = new Date(now.getTime() + expiresIn * 1000);
    const expiryTimestamp = Math.floor(expires.getTime() / 1000);

    const queryParams: Record<string, string> = {
      "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
      "X-Amz-Credential": `${this.accessKeyId}/${now
        .toISOString()
        .split("T")[0]
        .replace(/-/g, "")}/${this.region}/s3/aws4_request`,
      "X-Amz-Date": now.toISOString().replace(/[:-]/g, "").split(".")[0] + "Z",
      "X-Amz-Expires": expiresIn.toString(),
      "X-Amz-SignedHeaders": "host",
    };

    const sig = this.generateSignature("GET", `/${payload.key}`, queryParams);
    return sig.url;
  }

  /**
   * Delete a file from S3
   */
  async delete(key: string): Promise<S3Response<null>> {
    if (!this.accessKeyId || !this.secretAccessKey || !this.bucket) {
      return { success: false, error: "AWS S3 not configured" };
    }

    try {
      const sig = this.generateSignature("DELETE", `/${key}`);

      const response = await fetch(sig.url, {
        method: "DELETE",
        headers: sig.headers,
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Delete failed: ${response.statusText}`,
        };
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
   * Upload course resource (PDF, document, etc.)
   */
  async uploadCourseResource(
    courseId: string,
    filename: string,
    content: Buffer | string,
    contentType: string
  ): Promise<S3Response<S3FileMetadata>> {
    const key = `courses/${courseId}/resources/${filename}`;
    return this.upload({
      key,
      body: content,
      contentType,
      isPublic: false,
      metadata: {
        courseId,
        uploadedAt: new Date().toISOString(),
      },
    });
  }

  /**
   * Upload user avatar
   */
  async uploadUserAvatar(
    userId: string,
    filename: string,
    content: Buffer
  ): Promise<S3Response<S3FileMetadata>> {
    const key = `users/${userId}/avatar/${filename}`;
    return this.upload({
      key,
      body: content,
      contentType: "image/jpeg",
      isPublic: true,
    });
  }

  /**
   * Upload certificate
   */
  async uploadCertificate(
    userId: string,
    courseId: string,
    content: Buffer
  ): Promise<S3Response<S3FileMetadata>> {
    const key = `certificates/${userId}/${courseId}/certificate.pdf`;
    return this.upload({
      key,
      body: content,
      contentType: "application/pdf",
      isPublic: false,
    });
  }
}

// Singleton instance
let s3Instance: S3Service | null = null;

export const getS3Service = (): S3Service => {
  if (!s3Instance) {
    s3Instance = new S3Service();
  }
  return s3Instance;
};

export default S3Service;
