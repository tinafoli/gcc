import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting: 5 requests per 15 minutes per IP
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }
  
  if (limit.count >= 5) {
    return false;
  }
  
  limit.count++;
  return true;
}

// Sanitize HTML to prevent XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Get client IP address
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid request format. Please check your input.' },
        { status: 400 }
      );
    }
    const { name, email, phone, role, experience, motivation, resume } = body;

    // Validate required fields
    if (!name || !email || !role || !experience || !motivation) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate and sanitize input lengths
    if (name.length > 200 || email.length > 200 || role.length > 100) {
      return NextResponse.json(
        { error: 'Input too long. Please check your entries.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Sanitize all user inputs
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? sanitizeHtml(phone.trim()) : '';
    const sanitizedRole = sanitizeHtml(role.trim());
    const sanitizedExperience = sanitizeHtml(experience.trim());
    const sanitizedMotivation = sanitizeHtml(motivation.trim());
    const sanitizedResume = resume ? sanitizeHtml(resume.trim()) : '';

    // Check for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        console.error('RESEND_API_KEY is not configured');
      }
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Initialize Resend client lazily (only when needed)
    const resend = new Resend(apiKey);

    // Send email to Ghana Code Club (all inputs are sanitized)
    const data = await resend.emails.send({
      from: 'Ghana Code Club <onboarding@resend.dev>',
      to: 'codeclubghana@gmail.com',
      replyTo: sanitizedEmail,
      subject: `New Team Application: ${sanitizedName} - ${sanitizedRole}`,
      text: `
        New Team Application Received
        
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        Phone: ${sanitizedPhone || 'Not provided'}
        Role/Position: ${sanitizedRole}
        Experience/Background: ${sanitizedExperience}
        Motivation: ${sanitizedMotivation}
        Resume/CV Link: ${sanitizedResume || 'Not provided'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48;">New Team Application Received</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #e11d48; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
            
            <h3 style="color: #e11d48; margin-top: 20px;">Application Details</h3>
            <p><strong>Role/Position:</strong> ${sanitizedRole}</p>
            <p><strong>Experience/Background:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px;">${sanitizedExperience}</p>
            
            <p><strong>Motivation:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px;">${sanitizedMotivation}</p>
            
            ${sanitizedResume ? `<p><strong>Resume/CV Link:</strong> <a href="${sanitizedResume}" target="_blank" rel="noopener noreferrer">${sanitizedResume}</a></p>` : ''}
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This application was submitted through the Ghana Code Club website.
          </p>
        </div>
      `
    });

    // Send confirmation email to the applicant
    try {
      await resend.emails.send({
        from: 'Ghana Code Club <onboarding@resend.dev>',
        to: sanitizedEmail,
        subject: 'Thank You for Your Application - Ghana Code Club',
        text: `
          Dear ${sanitizedName},
          
          Thank you for your interest in joining the Ghana Code Club team! We have successfully received your application for the position of ${sanitizedRole}.
          
          Our team will review your application and get back to you within 5-7 business days. We appreciate your patience during this process.
          
          If you have any questions or need to update your application, please feel free to contact us at codeclubghana@gmail.com.
          
          Thank you for your interest in empowering Ghana's youth through coding education.
          
          Best regards,
          Ghana Code Club Team
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #e11d48; margin: 0;">Ghana Code Club</h1>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px;">
              <h2 style="color: #1f2937; margin-top: 0;">Thank You for Your Application!</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">Dear ${sanitizedName},</p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for your interest in joining the Ghana Code Club team! We have successfully received your application for the position of <strong>${sanitizedRole}</strong>.
              </p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #1f2937; margin: 0; font-weight: 600;">What happens next?</p>
                <ul style="color: #4b5563; line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Our team will review your application carefully</li>
                  <li>We'll get back to you within 5-7 business days</li>
                  <li>If selected, we'll contact you to schedule an interview</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                If you have any questions or need to update your application, please feel free to contact us at <a href="mailto:codeclubghana@gmail.com" style="color: #e11d48;">codeclubghana@gmail.com</a>.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for your interest in empowering Ghana's youth through coding education.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-top: 30px;">
                Best regards,<br>
                <strong style="color: #1f2937;">Ghana Code Club Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This is an automated confirmation email. Please do not reply to this email.
              </p>
            </div>
          </div>
        `
      });
    } catch (confirmationError) {
      // Log error but don't fail the request if confirmation email fails
      if (process.env.NODE_ENV === 'development') {
        console.error('Error sending confirmation email:', confirmationError);
      }
    }

    return NextResponse.json(
      { message: 'Application submitted successfully! We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    // Don't expose error details in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error sending team application email:', error);
    }
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}

