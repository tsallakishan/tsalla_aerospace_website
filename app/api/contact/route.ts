export const runtime = "nodejs"

import { type NextRequest, NextResponse } from "next/server"
import Mailjet from "node-mailjet"

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, phone, enquiryType, message } = await req.json()

    // Validate required fields
    if (!fullName || !email || !phone || !enquiryType || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY || "",
      process.env.MAILJET_SECRET_KEY || ""
    )

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL || "info@tsallaaerospace.com",
            Name: "Tsalla Aerospace Contact Form",
          },
          To: [
            {
              Email: "info@tsallaaerospace.com",
              Name: "Tsalla Aerospace Team",
            },
          ],
          Subject: `New Contact Form Submission - ${enquiryType}`,
          HTMLPart: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f4f6f8; padding: 30px; border-radius: 10px;">
              <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);">
                <h2 style="color: #1d3557; border-bottom: 3px solid #457b9d; padding-bottom: 12px; margin-top: 0;">
                  📩 New Contact Form Submission
                </h2>
        
                <div style="margin-top: 25px;">
                  <h3 style="color: #457b9d; font-size: 18px; margin-bottom: 10px;">👤 Contact Details</h3>
                  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                    <tr>
                      <td style="padding: 8px 0; color: #333;"><strong>Full Name:</strong></td>
                      <td style="padding: 8px 0; color: #333;">${fullName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #333;"><strong>Email:</strong></td>
                      <td style="padding: 8px 0; color: #333;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #333;"><strong>Phone:</strong></td>
                      <td style="padding: 8px 0; color: #333;">${phone}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #333;"><strong>Enquiry Type:</strong></td>
                      <td style="padding: 8px 0; color: #333;">${enquiryType}</td>
                    </tr>
                  </table>
                </div>
        
                <div style="margin-top: 30px;">
                  <h3 style="color: #457b9d; font-size: 18px; margin-bottom: 10px;">✉️ Message</h3>
                  <div style="background-color: #f1f3f5; padding: 20px; border-radius: 6px; font-size: 15px; color: #333; line-height: 1.6;">
                    ${message}
                  </div>
                </div>
        
                <div style="margin-top: 40px; font-size: 13px; color: #6c757d; text-align: center;">
                  This email was sent from the <strong>Tsalla Aerospace</strong> contact form.
                </div>
              </div>
            </div>
          `,
        },
      ],
    })

    await request

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
