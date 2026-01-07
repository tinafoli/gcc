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
    const { organizationName, contactName, email, phone, website, partnershipType, message, interests } = body;

    // Validate required fields
    if (!organizationName || !contactName || !email || !partnershipType || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate and sanitize input lengths
    if (organizationName.length > 200 || contactName.length > 200 || email.length > 200 || partnershipType.length > 100) {
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

    // Validate URL format if website is provided
    if (website && !/^https?:\/\/.+/.test(website)) {
      return NextResponse.json(
        { error: 'Please enter a valid website URL (must start with http:// or https://)' },
        { status: 400 }
      );
    }

    // Sanitize all user inputs
    const sanitizedOrgName = sanitizeHtml(organizationName.trim());
    const sanitizedContactName = sanitizeHtml(contactName.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? sanitizeHtml(phone.trim()) : '';
    const sanitizedWebsite = website ? sanitizeHtml(website.trim()) : '';
    const sanitizedPartnershipType = sanitizeHtml(partnershipType.trim());
    const sanitizedInterests = interests ? sanitizeHtml(interests.trim()) : '';
    const sanitizedMessage = sanitizeHtml(message.trim());

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
      subject: `New Partnership Inquiry: ${sanitizedOrgName} - ${sanitizedPartnershipType}`,
      text: `
        New Partnership Inquiry Received
        
        Organization: ${sanitizedOrgName}
        Contact Name: ${sanitizedContactName}
        Email: ${sanitizedEmail}
        Phone: ${sanitizedPhone || 'Not provided'}
        Website: ${sanitizedWebsite || 'Not provided'}
        Partnership Type: ${sanitizedPartnershipType}
        Areas of Interest: ${sanitizedInterests || 'Not specified'}
        Message: ${sanitizedMessage}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e11d48;">New Partnership Inquiry Received</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #e11d48; margin-top: 0;">Organization Information</h3>
            <p><strong>Organization Name:</strong> ${sanitizedOrgName}</p>
            <p><strong>Contact Name:</strong> ${sanitizedContactName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Phone:</strong> ${sanitizedPhone || 'Not provided'}</p>
            <p><strong>Website:</strong> ${sanitizedWebsite ? `<a href="${sanitizedWebsite}" target="_blank" rel="noopener noreferrer">${sanitizedWebsite}</a>` : 'Not provided'}</p>
            
            <h3 style="color: #e11d48; margin-top: 20px;">Partnership Details</h3>
            <p><strong>Partnership Type:</strong> ${sanitizedPartnershipType}</p>
            ${sanitizedInterests ? `<p><strong>Areas of Interest:</strong> ${sanitizedInterests}</p>` : ''}
            
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px;">${sanitizedMessage}</p>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This partnership inquiry was submitted through the Ghana Code Club website.
          </p>
        </div>
      `
    });

    // Send confirmation email to the partner
    try {
      await resend.emails.send({
        from: 'Ghana Code Club <onboarding@resend.dev>',
        to: sanitizedEmail,
        subject: 'Thank You for Your Partnership Inquiry - Ghana Code Club',
        text: `
          Dear ${sanitizedContactName},
          
          Thank you for your interest in partnering with Ghana Code Club! We have successfully received your partnership inquiry for ${sanitizedOrgName}.
          
          Our partnership team will review your inquiry and get back to you within 5-7 business days. We're excited about the possibility of working together to empower Ghana's youth through technology education.
          
          If you have any questions or need to provide additional information, please feel free to contact us at codeclubghana@gmail.com.
          
          Thank you for your interest in creating lasting impact together.
          
          Best regards,
          Ghana Code Club Partnership Team
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #e11d48; margin: 0;">Ghana Code Club</h1>
            </div>
            
            <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px;">
              <h2 style="color: #1f2937; margin-top: 0;">Thank You for Your Partnership Inquiry!</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">Dear ${sanitizedContactName},</p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for your interest in partnering with Ghana Code Club! We have successfully received your partnership inquiry for <strong>${sanitizedOrgName}</strong>.
              </p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #1f2937; margin: 0; font-weight: 600;">Partnership Details:</p>
                <ul style="color: #4b5563; line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
                  <li><strong>Partnership Type:</strong> ${sanitizedPartnershipType}</li>
                  ${sanitizedInterests ? `<li><strong>Areas of Interest:</strong> ${sanitizedInterests}</li>` : ''}
                </ul>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0;">
                <p style="color: #1f2937; margin: 0; font-weight: 600;">What happens next?</p>
                <ul style="color: #4b5563; line-height: 1.8; margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Our partnership team will review your inquiry carefully</li>
                  <li>We'll get back to you within 5-7 business days</li>
                  <li>If there's a good fit, we'll schedule a meeting to discuss collaboration opportunities</li>
                </ul>
              </div>
              
              <p style="color: #4b5563; line-height: 1.6;">
                We're excited about the possibility of working together to empower Ghana's youth through technology education. If you have any questions or need to provide additional information, please feel free to contact us at <a href="mailto:codeclubghana@gmail.com" style="color: #e11d48;">codeclubghana@gmail.com</a>.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Thank you for your interest in creating lasting impact together.
              </p>
              
              <p style="color: #4b5563; line-height: 1.6; margin-top: 30px;">
                Best regards,<br>
                <strong style="color: #1f2937;">Ghana Code Club Partnership Team</strong>
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
      { message: 'Partnership inquiry submitted successfully! We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    // Log error details for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (process.env.NODE_ENV === 'development') {
      console.error('Error sending partnership inquiry email:', error);
      console.error('Error details:', errorMessage);
    }
    
    // Return a proper error response
    return NextResponse.json(
      { 
        error: 'Failed to submit partnership inquiry. Please try again later.',
        ...(process.env.NODE_ENV === 'development' && { details: errorMessage })
      },
      { status: 500 }
    );
  }
}

