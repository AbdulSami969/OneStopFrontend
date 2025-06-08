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

    // Email to Client (simple, branded template)
    const clientMailOptions = {
      from: `"1 Stop Pest Control" <${zohoEmail}>`,
      to: formData.email,
      subject: "Thank You for Contacting 1 Stop Pest Control",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Thank You</title>
        </head>
        <body style="background-color:#f7f7f7;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f7f7;padding:30px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                  <tr>
                    <td style="padding:40px 0;text-align:center;background-color:#0b2e13;">
                      <img src="https://cdn.sanity.io/images/s6dg2z72/production/33360b92c352e7c75627d9f24bbe708af5d5595d-664x397.png" alt="1 Stop Pest Control Logo" width="180" style="display:block;margin:0 auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:40px 40px 20px 40px;color:#333333;">
                      <h2 style="margin:0 0 16px 0;color:#0b2e13;font-weight:600;">Thank you, ${formData.name}!</h2>
                      <p style="margin:0 0 24px 0;line-height:1.5;">We appreciate you reaching out to 1 Stop Pest Control. Your message is important to us and one of our specialists will get back to you shortly.</p>
                      <p style="margin:0 0 24px 0;line-height:1.5;">If your request is urgent, please call us at <a href="tel:518-728-5589" style="color:#0b2e13;text-decoration:none;font-weight:bold;">(800) 123-4567</a>.</p>
                      <p style="margin:0;line-height:1.5;">Sincerely,<br />The 1 Stop Pest Control Team</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px 40px;background-color:#f1f1f1;text-align:center;font-size:12px;color:#777777;">
                      © ${new Date().getFullYear()} 1 Stop Pest Control. All rights reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>`,
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
