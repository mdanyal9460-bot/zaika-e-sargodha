import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    // Safe filename parsing
    const filename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    // Upload directly to Vercel Blob
    const blob = await put(`dish-images/${filename}`, file, {
      access: 'public',
    });
    
    // Return the absolute public URL from Vercel Blob
    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Error during Vercel Blob upload:', error);
    return NextResponse.json({ error: 'Upload to Vercel Blob failed.' }, { status: 500 });
  }
}
