import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'saey.egyptian@gmail.com';

// ── In-memory sliding window rate limiter ────────────────────────────────────
// Max 3 requests per IP per 10 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > windowStart);
  hits.push(now);
  ipHits.set(ip, hits);

  // Cleanup: evict IPs with no recent hits to avoid memory growth
  if (ipHits.size > 5000) {
    for (const [key, times] of ipHits) {
      if (times.every((t) => t <= windowStart)) ipHits.delete(key);
    }
  }

  return hits.length > RATE_LIMIT_MAX;
}

/** Escape HTML special chars to prevent XSS in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  // Rate limiting — max 3 requests per IP per 10 minutes
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'عدد المحاولات تجاوز الحد المسموح. حاول مجدداً بعد 10 دقائق.' },
      { status: 429, headers: { 'Retry-After': '600' } }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
  }
  const resend = new Resend(apiKey);
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // Basic validation
    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }

    // Sanitize all user-supplied values before embedding in HTML email
    const safeName    = escapeHtml(String(name).trim().slice(0, 200));
    const safeEmail   = email    ? escapeHtml(String(email).trim().slice(0, 200))   : '';
    const safePhone   = phone    ? escapeHtml(String(phone).trim().slice(0, 50))    : '';
    const safeService = service  ? escapeHtml(String(service).trim().slice(0, 200)) : '';
    const safeMessage = escapeHtml(String(message).trim().slice(0, 5000));

    const { data, error } = await resend.emails.send({
      from: 'سعي للتسويق الرقمي <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: safeEmail || undefined,
      subject: `رسالة جديدة من ${safeName} — سعي`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8faff; border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2563EB, #5B4EE8); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900;">سعي للتسويق الرقمي</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 13px;">رسالة جديدة من موقع salemrizk.online</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px; background: white;">
            <h2 style="color: #0B1020; font-size: 18px; margin: 0 0 24px; border-bottom: 2px solid #F8FAFF; padding-bottom: 12px;">
              تفاصيل الرسالة
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #374151; font-size: 13px; width: 120px; font-weight: 700;">الاسم</td>
                <td style="padding: 10px 0; color: #0B1020; font-size: 14px; font-weight: 600;">${safeName}</td>
              </tr>
              ${safeEmail ? `
              <tr style="background: #f8faff;">
                <td style="padding: 10px 8px; color: #374151; font-size: 13px; font-weight: 700;">البريد الإلكتروني</td>
                <td style="padding: 10px 8px; color: #2563EB; font-size: 14px;">
                  <a href="mailto:${safeEmail}" style="color: #2563EB; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>` : ''}
              ${safePhone ? `
              <tr>
                <td style="padding: 10px 0; color: #374151; font-size: 13px; font-weight: 700;">رقم الهاتف</td>
                <td style="padding: 10px 0; color: #0B1020; font-size: 14px;">
                  <a href="tel:${safePhone}" style="color: #0B1020; text-decoration: none;">${safePhone}</a>
                </td>
              </tr>` : ''}
              ${safeService ? `
              <tr style="background: #f8faff;">
                <td style="padding: 10px 8px; color: #374151; font-size: 13px; font-weight: 700;">الخدمة المطلوبة</td>
                <td style="padding: 10px 8px; color: #0B1020; font-size: 14px;">${safeService}</td>
              </tr>` : ''}
            </table>

            <!-- Message -->
            <div style="margin-top: 24px; padding: 20px; background: #F8FAFF; border-radius: 10px; border-right: 4px solid #2563EB;">
              <p style="color: #374151; font-size: 12px; font-weight: 700; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">الرسالة</p>
              <p style="color: #0B1020; font-size: 15px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>

            <!-- Reply CTA -->
            ${safeEmail ? `
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${safeEmail}?subject=رد على رسالتك — سعي للتسويق الرقمي"
                style="display: inline-block; background: linear-gradient(135deg, #2563EB, #5B4EE8); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">
                الرد على ${safeName}
              </a>
            </div>` : ''}
          </div>

          <!-- Footer -->
          <div style="padding: 20px 32px; background: #0B1020; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">
              سعي للتسويق الرقمي · salemrizk.online
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
