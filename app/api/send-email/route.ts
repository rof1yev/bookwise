import config from "@/lib/config";

export async function POST(req: Request) {
  const { email, subject, message, name, time } = await req.json();

  const res = await fetch(config.env.emailjs.apiUrl!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: config.env.emailjs.serviceId,
      template_id: config.env.emailjs.templateId,
      user_id: config.env.emailjs.publicKey,
      template_params: {
        to_email: email,
        subject,
        message,
        name,
        time,
      },
    }),
  });

  if (!res.ok) {
    console.error("EmailJS error:", await res.text());
    return Response.json({ success: false }, { status: 500 });
  }

  return Response.json({ success: true });
}
