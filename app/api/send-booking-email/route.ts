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

    // Email content for the client
    const clientMailOptions = {
      from: `"1 Stop Pest Control" <${zohoEmail}>`,
      to: email,
      subject: "Your Pest Control Appointment Request Confirmation",
      html: `
        <h1>Thank You for Your Booking, ${firstName}!</h1>
        <p>We have received your pest control service request. Here are the details:</p>
        <ul>
          <li><strong>Name:</strong> ${firstName} ${lastName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Pest Type:</strong> ${pestType}</li>
          <li><strong>Property Type:</strong> ${propertyType}</li>
          ${businessInfo ? `<li><strong>Business Info:</strong> ${businessInfo}</li>` : ""}
          <li><strong>Pest Info:</strong> ${pestInfo}</li>
          <li><strong>Address:</strong> ${address}</li>
          ${gateCode ? `<li><strong>Gate Code/Instructions:</strong> ${gateCode}</li>` : ""}
          <li><strong>Requested Date:</strong> ${selectedDate || "Not specified"}</li>
          <li><strong>Requested Time:</strong> ${selectedTime || "Not specified"}</li>
        </ul>
        <p>We will contact you shortly to confirm the appointment. If you have any immediate questions, please don't hesitate to reach out.</p>
        <p>Sincerely,</p>
        <p>1 Stop Pest Control</p>
      `,
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
