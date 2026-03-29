import { NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  company?: string;
  challenge?: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.country) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    // Send email via Formsubmit
    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("country", data.country);
    formData.append("company", data.company || "Não informado");
    formData.append("challenge", data.challenge || "Não informado");
    formData.append("_subject", `Novo contato do site Connect - ${data.name}`);
    formData.append("_captcha", "false"); // Disable captcha (we have our own validation)
    formData.append("_template", "table"); // Beautiful table format
    formData.append("_replyto", data.email); // Reply to the sender
    formData.append("_next", ""); // Don't redirect, we handle the response

    const formsubmitResponse = await fetch(
      "https://formsubmit.co/email.connect360@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    if (!formsubmitResponse.ok) {
      console.error("Formsubmit error:", await formsubmitResponse.text());
      // Still return success to user, but log the error
      // Formsubmit might fail due to first-time confirmation requirement
    }

    // Log for backup
    console.log("New contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      company: data.company,
      challenge: data.challenge,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação. Por favor, tente novamente." },
      { status: 500 }
    );
  }
}
