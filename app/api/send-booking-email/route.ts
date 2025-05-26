import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EmailFormData {
  pestType: string;
  propertyType: string;
  businessInfo?: string;
  pestInfo: string;
  address: string;
  gateCode?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  selectedDate: string | null; // Assuming date is stringified by the client
  selectedTime: string;
}

export async function POST(req: Request) {
  try {
    const { pestType, propertyType, businessInfo, pestInfo, address, gateCode, firstName, lastName, email, phone, selectedDate, selectedTime }: EmailFormData = await req.json();

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !pestType || !propertyType || !pestInfo || !address) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const zohoEmail = process.env.ZOHO_EMAIL;
    const zohoAppPassword = process.env.ZOHO_APP_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL; // Your admin email

    if (!zohoEmail || !zohoAppPassword) {
      console.error("Zoho email credentials are not set in environment variables.");
      return NextResponse.json({ message: "Server configuration error. Email credentials missing." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: zohoEmail,
        pass: zohoAppPassword,
      },
    });

    // Email content for the client (branded template)
    const clientMailOptions = {
      from: `"1 Stop Pest Control" <${zohoEmail}>`,
      to: email,
      subject: "Your Pest Control Appointment Request Confirmation",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Booking Confirmation</title>
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
                      <h2 style="margin:0 0 16px 0;color:#0b2e13;font-weight:600;">Thank you for your booking, ${firstName}!</h2>
                      <p style="margin:0 0 24px 0;line-height:1.5;">We have received your pest control service request and will contact you shortly to confirm your appointment details.</p>
                      <p style="margin:0 0 24px 0;line-height:1.5;">Our team of certified professionals is ready to help you with your ${pestType} issue at your ${propertyType}.</p>
                      <p style="margin:0 0 24px 0;line-height:1.5;">If you have any immediate questions or need to make changes to your request, please call us at <a href="tel:+1-800-123-4567" style="color:#0b2e13;text-decoration:none;font-weight:bold;">(800) 123-4567</a>.</p>
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

    // Email content for the admin
    const adminMailOptions = {
      from: `"Booking System" <${zohoEmail}>`,
      to: adminEmail,
      subject: "New Pest Control Appointment Request",
      html: `
        <h1>New Appointment Request Received</h1>
        <p>A new pest control service request has been submitted. Details:</p>
        <ul>
          <li><strong>Client Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Client Email:</strong> ${email}</li>
          <li><strong>Client Phone:</strong> ${phone}</li>
          <li><strong>Pest Type:</strong> ${pestType}</li>
          <li><strong>Property Type:</strong> ${propertyType}</li>
          ${businessInfo ? `<li><strong>Business Info:</strong> ${businessInfo}</li>` : ""}
          <li><strong>Pest Info:</strong> ${pestInfo}</li>
          <li><strong>Address:</strong> ${address}</li>
          ${gateCode ? `<li><strong>Gate Code/Instructions:</strong> ${gateCode}</li>` : ""}
          <li><strong>Requested Date:</strong> ${selectedDate || "Not specified"}</li>
          <li><strong>Requested Time:</strong> ${selectedTime || "Not specified"}</li>
        </ul>
      `,
    };

    // Send both emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ message: "Emails sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Error sending email.", error: errorMessage }, { status: 500 });
  }
}
