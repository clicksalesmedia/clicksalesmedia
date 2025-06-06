import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const folder: string = data.get('folder') as string || 'uploads';

    if (!file) {
      return NextResponse.json(
        { error: 'No file received' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    
    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', folder);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, which is fine
    }

    // Save file
    const filePath = join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/${folder}/${uniqueFilename}`;

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: publicUrl,
      filename: uniqueFilename,
      originalName: file.name,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

// Increase the payload size limit for image uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}; 