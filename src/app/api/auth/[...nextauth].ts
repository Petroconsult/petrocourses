/**
 * Auth.js API Route Handler
 * Core authentication endpoint for Next.js 14+
 * Handles signin, signout, session management, and OAuth callbacks
 * Requires NEXTAUTH_SECRET environment variable to be set
 */

import { auth } from "@auth/core";
import { authConfig } from "@/modules/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handle GET requests (for signin, signout, session, etc.)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  const pathname = "/" + (params.nextauth?.join("/") || "");

  // Handle specific auth endpoints
  if (pathname === "/api/auth/session") {
    const session = await auth(authConfig);
    return NextResponse.json(session || null);
  }

  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}

/**
 * Handle POST requests (for signin, signout, callback, etc.)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  const pathname = "/" + (params.nextauth?.join("/") || "");

  // This is a simplified implementation
  // In production, you'd want to use a more complete auth handler
  // Consider using @auth/nextjs once it's available/stable

  return NextResponse.json({ error: "POST not implemented yet" }, { status: 501 });
}
