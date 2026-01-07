import { NextResponse } from 'next/server';
import * as SibApiV3Sdk from '@sendinblue/client';

export async function POST(request: Request) {
  try {
    // Debug: Check if API key is loaded
    console.log('BREVO_API_KEY loaded:', !!process.env.BREVO_API_KEY);
    console.log('API Key length:', process.env.BREVO_API_KEY?.length);
    
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Newsletter service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Initialize API instance lazily (only when needed)
    const apiInstance = new SibApiV3Sdk.ContactsApi();
    apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey);

    const createContact = new SibApiV3Sdk.CreateContact();
    createContact.email = email;
    createContact.listIds = [6]; // Brevo newsletter list ID #6
    createContact.updateEnabled = true;

    await apiInstance.createContact(createContact);

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.text,
      status: error.response?.status,
      apiKey: !!process.env.BREVO_API_KEY
    });
    
    // Check if it's a duplicate contact error
    if (error.response?.text?.includes('Contact already exist')) {
      return NextResponse.json(
        { error: 'You are already subscribed to our newsletter!' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter. Please try again later.' },
      { status: 500 }
    );
  }
} 