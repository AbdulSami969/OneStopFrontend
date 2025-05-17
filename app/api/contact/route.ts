import { writeClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";

// Helper function to send email notification (placeholder for actual email implementation)

export async function POST(req: Request) {
  try {
    // Parse the request body
    const formData = await req.json();

    // Create a document to save in Sanity
    const submission = {
      _type: "contactSubmission",
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      subject: formData.service || "",
      message: formData.message || "",
      submittedAt: new Date().toISOString(),
    };

    // Create the document in Sanity using the writeClient with token
    const result = await writeClient.create(submission);

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      id: result._id,
    });
  } catch (error) {
    console.error("Error submitting form:", error);

    // Return error response
    return NextResponse.json(
      {
        success: false,
        message: "Error submitting form",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
