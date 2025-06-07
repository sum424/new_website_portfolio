import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    // Validate form data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // In a real implementation, you would use a service like SendGrid, Mailgun, etc.
    // For this example, we'll simulate a successful email send

    // Example of how you would use EmailJS (you would need to set up an account)
    // const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     service_id: 'your_service_id',
    //     template_id: 'your_template_id',
    //     user_id: 'your_user_id',
    //     template_params: {
    //       to_email: 'sumanthapa326@gmail.com',
    //       from_name: name,
    //       from_email: email,
    //       subject: subject,
    //       message: message,
    //     },
    //   }),
    // });

    console.log("Email would be sent to: sumanthapa326@gmail.com")
    console.log("From:", name, email)
    console.log("Subject:", subject)
    console.log("Message:", message)

    // Return success response
    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
