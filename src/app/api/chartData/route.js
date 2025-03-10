import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/dbConnection/mongodb";
import SharePrice from "@/app/lib/Schema/shareCardSchema";
import { read, utils } from 'xlsx';

export async function GET(request) {
  try {
    await connectToDatabase();
    const data = await SharePrice.find().sort({ 'daily.date': -1 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const workbook = read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[2]; 
    const sheet = workbook.Sheets[sheetName];
    const rawData = utils.sheet_to_json(sheet);

    if (!rawData || rawData.length === 0) {
      return NextResponse.json({ success: false, error: 'No data found in sheet' }, { status: 400 });
    }

    // Process the data into daily, weekly, and monthly arrays
    const processedData = rawData.reduce((acc, item) => {
      
        if (!item.date || !item.price) {
        throw new Error('Invalid data format. Each row must have date and price fields');
      }

      try {
        const date = new Date(item.date).toISOString().split('T')[0];
        const price = Number(item.price);

        if (isNaN(price)) {
          throw new Error(`Invalid price value for date ${date}`);
        }

        // Add to daily data
        acc.daily.push({
          date,
          price
        });

        // Process weekly data
        if (new Date(date).getDay() === 5) {
          acc.weekly.push({
            date,
            price
          });
        }

        // Process monthly data (last day of month)
        const currentDate = new Date(date);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        if (currentDate.getDate() === lastDayOfMonth) {
          acc.monthly.push({
            date,
            price
          });
        }
        return acc;
      } catch (error) {
        throw new Error(`Error processing row: ${error.message}`);
      }
    }, { daily: [], weekly: [], monthly: [] });

    await SharePrice.findOneAndUpdate(
      {}, // empty filter to match any document
      processedData,
      { upsert: true, new: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Data processed successfully',
      summary: {
        daily: processedData.daily.length,
        weekly: processedData.weekly.length,
        monthly: processedData.monthly.length
      }
    });
    
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}