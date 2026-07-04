import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Safe filename parsing to remove spaces and special characters
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // We are simulating an S3 upload by putting it directly in public/images
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    // Return the relative URL that can be used on the frontend
    const url = `/images/${filename}`;
    
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error('Error during file upload:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
