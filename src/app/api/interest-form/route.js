import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/dbConnection/mongodb";
import InterestForm from "@/app/lib/Schema/interest-form";
import { google } from 'googleapis';

async function getGoogleSheetsClient() {
  try {
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('Google Sheets credentials are not properly configured');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

async function saveToMongoDB(formData) {
  try {
    await connectToDatabase();
    const interestForm = new InterestForm(formData);
    await interestForm.save();
    return true;
  } catch (error) {
    console.error('MongoDB Error:', error);
    return false;
  }
}

async function saveToGoogleSheets(formData) {
  try {
    const sheets = await getGoogleSheetsClient();
    const { name, email, phone, investmentAmount, interestType, message } = formData;
    
    const submissionDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    const values = [
      [name, email, phone, investmentAmount, interestType, message || 'N/A', submissionDate]
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Interest Form Responses!A:G',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    return response.data;
  } catch (error) {
    console.error('Google Sheets Error:', error);
    return false;
  }
}

export async function POST(request) {
  
  try {
    const body = await request.json();
    const { name, email, phone, investmentAmount, interestType, message } = body;

    if (!name || !email || !phone || !investmentAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    const mongoResult = await saveToMongoDB(body);
    const sheetsResult = await saveToGoogleSheets(body);

    if (!mongoResult && !sheetsResult) {
      throw new Error('Failed to save data to both MongoDB and Google Sheets');
    }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      mongoSaved: !!mongoResult,
      sheetsSaved: !!sheetsResult
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit form. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


