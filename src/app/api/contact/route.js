import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { validateContactForm } from '@/lib/validators';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = body;

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      // Gmail configuration (you can change this to your preferred email service)
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D4F4A;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0A0F0D;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #0A0F0D;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #8DB1A4; color: white; border-radius: 8px;">
            <p style="margin: 0;"><strong>Reply to:</strong> ${email}</p>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        
        Message:
        ${message}
        
        Reply to: ${email}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to the sender
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2D4F4A;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0A0F0D;">Your Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>Best regards,<br>Aashish Sachdeva</p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #8DB1A4; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0;">Visit my portfolio: <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourportfolio.com'}" style="color: white;">Portfolio Website</a></p>
          </div>
        </div>
      `,
      text: `
        Hi ${name},
        
        Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.
        
        Your Message:
        ${message}
        
        Best regards,
        Aashish Sachdeva
      `,
    };

    // Send confirmation email (optional - you can remove this if you don't want to send confirmations)
    try {
      await transporter.sendMail(confirmationMailOptions);
    } catch (confirmationError) {
      console.error('Failed to send confirmation email:', confirmationError);
      // Don't fail the whole request if confirmation email fails
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}