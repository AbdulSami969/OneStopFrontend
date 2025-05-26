import { writeClient } from "@/lib/sanity.client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper function to send email notification (placeholder for actual email implementation)

export async function POST(req: Request) {
  let sanityResultId: string | null = null;
  try {
    // Parse the request body
    const formData = await req.json();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json({ success: false, message: "Name, Email, and Message are required." }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      return NextResponse.json({ success: false, message: "Invalid email address." }, { status: 400 });
    }

    // Create a document to save in Sanity
    const submission = {
      _type: "contactSubmission",
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      subject: formData.service || formData.subject || "No Subject",
      message: formData.message || "",
      submittedAt: new Date().toISOString(),
    };

    // Create the document in Sanity using the writeClient with token
    const result = await writeClient.create(submission);
    sanityResultId = result._id;

    // --- Email Sending Logic ---
    const zohoEmail = process.env.ZOHO_EMAIL;
    const zohoAppPassword = process.env.ZOHO_APP_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL; // Your admin email

    if (!zohoEmail || !zohoAppPassword) {
      console.error("Zoho email credentials are not set in environment variables for contact form.");
      return NextResponse.json({
        success: true,
        message: "Form submitted to Sanity, but email server not configured.",
        id: result._id,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: zohoEmail,
        pass: zohoAppPassword,
      },
    });

    // Email to Client
    const clientMailOptions = {
      from: `"1 Stop Pest Control" <${zohoEmail}>`,
      to: formData.email,
      subject: "Thank You for Contacting 1 Stop Pest Control",
      html: `
        <h1>Thank You, ${formData.name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Here's a summary of your submission:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          ${formData.phone ? `<li><strong>Phone:</strong> ${formData.phone}</li>` : ""}
          <li><strong>Subject:</strong> ${submission.subject}</li>
          <li><strong>Message:</strong></br><pre>${formData.message}</pre></li>
        </ul>
        <p>Sincerely,</p>
        <p>The 1 Stop Pest Control Team</p>
      `,
    };

    // Email to Admin
    const adminMailOptions = {
      from: `"Contact Form Alert" <${zohoEmail}>`,
      to: adminEmail,
      subject: `New Contact Form Submission: ${submission.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p>You have received a new message through the contact form:</p>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          ${formData.phone ? `<li><strong>Phone:</strong> ${formData.phone}</li>` : ""}
          <li><strong>Subject:</strong> ${submission.subject}</li>
          <li><strong>Message:</strong></br><pre>${formData.message}</pre></li>
          <li><strong>Submitted At:</strong> ${new Date(submission.submittedAt).toLocaleString()}</li>
        </ul>
      `,
    };

    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);
    // --- End Email Sending Logic ---

    // Return success response (both Sanity and Email OK)
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully and emails sent.",
      id: result._id,
    });
  } catch (error) {
    console.error("Error in contact API:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error submitting form or sending email.",
        error: errorMessage,
        submissionId: sanityResultId,
      },
      { status: 500 }
    );
  }
}
