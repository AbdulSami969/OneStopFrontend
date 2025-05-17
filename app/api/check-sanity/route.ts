import { writeClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Try to list document types (simple test that requires authentication)
    const types = await writeClient.fetch(`*[_type == "contactSubmission"][0...1]`);

    return NextResponse.json({
      success: true,
      message: "Sanity connection is working",
      token: !!writeClient.config().token,
      types: types || [],
    });
  } catch (error) {
    console.error("Sanity connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Sanity connection failed",
        error: error instanceof Error ? error.message : String(error),
        tokenProvided: !!writeClient.config().token,
      },
      { status: 500 }
    );
  }
}
