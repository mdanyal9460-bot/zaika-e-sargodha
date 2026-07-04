import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to our JSON database
const DATA_FILE = path.join(process.cwd(), 'src/data/menuData.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading menuData.json:', error);
    return NextResponse.json({ error: 'Failed to read menu data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMenuData = await request.json();
    
    // Validate we got an array
    if (!Array.isArray(newMenuData)) {
      return NextResponse.json({ error: 'Invalid data format. Expected an array.' }, { status: 400 });
    }

    // Write back to the filesystem
    fs.writeFileSync(DATA_FILE, JSON.stringify(newMenuData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Menu updated successfully' });
  } catch (error) {
    console.error('Error writing menuData.json:', error);
    return NextResponse.json({ error: 'Failed to save menu data' }, { status: 500 });
  }
}
