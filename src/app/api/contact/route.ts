import { Resend } from "resend";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "a2goel@ucsd.edu",
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }

  return Response.json({ success: true });
}
