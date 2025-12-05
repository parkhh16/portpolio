"use server"

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const MAX_MONTHLY_REQUESTS = 100

type ContactPayload = {
  name: string
  email: string
  message: string
}

// Very simple in-memory counter for rate-limiting while the server is alive.
// For production, replace this with a persistent store (Redis, DB, etc.).
let monthlyCount = 0

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 })
    }

    if (monthlyCount >= MAX_MONTHLY_REQUESTS) {
      return NextResponse.json(
        {
          ok: false,
          error: "Contact limit exceeded. Please try again later or email directly.",
        },
        { status: 429 },
      )
    }

    monthlyCount += 1

    const toEmail = process.env.CONTACT_TO_EMAIL
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!toEmail || !smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error("SMTP/CONTACT env vars are not fully set")
      return NextResponse.json(
        { ok: false, error: "Email configuration is not complete. Please try again later." },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: toEmail,
      replyTo: body.email,
      subject: `New contact from ${body.name}`,
      text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error in /api/contact:", error)
    return NextResponse.json({ ok: false, error: "Failed to send message." }, { status: 500 })
  }
}
