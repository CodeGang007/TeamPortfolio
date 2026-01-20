import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to strip HTML and create plain text version
function htmlToText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&copy;/g, '©')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function POST(req: Request) {
  try {
    const { to, subject, html } = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Generate plain text version from HTML
    const textContent = htmlToText(html);

    const mailOptions = {
      from: `"CodeGang" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
      text: textContent, // Plain text version helps avoid spam filters
      replyTo: process.env.SMTP_EMAIL,
      headers: {
        'X-Mailer': 'CodeGang Mailer',
        'List-Unsubscribe': `<mailto:${process.env.SMTP_EMAIL}?subject=Unsubscribe>`,
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
