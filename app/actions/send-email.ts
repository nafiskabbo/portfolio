'use server';

import nodemailer from 'nodemailer';

interface ContactFormData {
  email: string;
  category: string;
  subject: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
}

const RATE_LIMIT_MAP = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const lastSent = RATE_LIMIT_MAP.get(email);
  if (lastSent && now - lastSent < RATE_LIMIT_WINDOW_MS) {
    return true;
  }
  RATE_LIMIT_MAP.set(email, now);
  return false;
}

function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim();
}

export async function sendContactEmail(data: ContactFormData): Promise<ActionResult> {
  const { email, category, subject, message } = data;

  // Validation
  if (!email || !category || !subject || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address.' };
  }

  if (subject.length > 200) {
    return { success: false, error: 'Subject is too long.' };
  }

  if (message.length > 5000) {
    return { success: false, error: 'Message is too long (max 5000 characters).' };
  }

  // Rate limiting
  if (isRateLimited(email)) {
    return { success: false, error: 'Please wait a minute before sending another message.' };
  }

  // Environment check
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_APP_PASSWORD;
  const recipientEmail = process.env.CONTACT_EMAIL || 'nafiskabbo30@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials not configured');
    return { success: false, error: 'Email service is not configured. Please try again later.' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeEmail = sanitize(email);
    const safeCategory = sanitize(category);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: safeEmail,
      subject: `[Portfolio] [${safeCategory}] ${safeSubject}`,
      text: `From: ${safeEmail}\nProject Type: ${safeCategory}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #3DDC84; margin: 0 0 20px 0; font-size: 20px;">New Portfolio Inquiry</h2>
          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8;">From</p>
            <p style="margin: 0; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a></p>
          </div>
          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8;">Project Type</p>
            <p style="margin: 0; font-size: 15px; color: #f1f5f9;">${safeCategory}</p>
          </div>
          <div style="background: #1e293b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8;">Subject</p>
            <p style="margin: 0; font-size: 15px; color: #f1f5f9;">${safeSubject}</p>
          </div>
          <div style="background: #1e293b; border-radius: 8px; padding: 16px;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #94a3b8;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #f1f5f9; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
          </div>
          <p style="margin: 24px 0 0 0; font-size: 12px; color: #64748b; text-align: center;">Sent from nafiskabbo.dev portfolio contact form</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send message. Please try again.' };
  }
}
