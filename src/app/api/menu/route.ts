import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { kv } from '@vercel/kv';

const DATA_FILE = path.join(process.cwd(), 'src/data/menuData.json');

export async function GET() {
  try {
    // 1. Attempt to fetch from KV first
    let data = await kv.get('menuData');
    
    // 2. If KV is empty (first run or reset), read local seed data
    if (!data) {
      console.log('No menu data in KV. Seeding from local file...');
      const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
      data = JSON.parse(fileContents);
      
      // Attempt to seed KV with the initial data
      try {
        await kv.set('menuData', data);
      } catch (kvError) {
        console.warn('Failed to seed Vercel KV (Are env variables set?):', kvError);
      }
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return NextResponse.json({ error: 'Failed to read menu data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMenuData = await request.json();
    
    if (!Array.isArray(newMenuData)) {
      return NextResponse.json({ error: 'Invalid data format. Expected an array.' }, { status: 400 });
    }

    // Write strictly to Vercel KV
    await kv.set('menuData', newMenuData);
    
    return NextResponse.json({ success: true, message: 'Menu updated successfully in Vercel KV' });
  } catch (error) {
    console.error('Error writing to Vercel KV:', error);
    return NextResponse.json({ error: 'Failed to save menu data to Vercel KV' }, { status: 500 });
  }
}
