import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, access, constants, stat } from 'fs/promises';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { v4 as uuidv4 } from 'uuid';

// Function to check if directory exists and create it if it doesn't
async function ensureDirectoryExists(directory: string) {
  try {
    await access(directory, constants.F_OK);
    console.log(`Directory exists: ${directory}`);
    
    // Check if directory is writable
    try {
      await access(directory, constants.W_OK);
      console.log(`Directory is writable: ${directory}`);
    } catch (err) {
      console.error(`Directory is not writable: ${directory}`);
      throw new Error(`Directory is not writable: ${directory}`);
    }
  } catch (error) {
    // Directory doesn't exist, create it
    console.log(`Creating directory: ${directory}`);
    try {
      await mkdir(directory, { recursive: true });
      console.log(`Directory created successfully: ${directory}`);
    } catch (err) {
      console.error(`Failed to create directory: ${directory}`, err);
      throw new Error(`Failed to create directory: ${directory}`);
    }
  }
}

export async function POST(request: NextRequest) {
  console.log('Upload API called');
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('No file uploaded');
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    console.log('Received file upload:', {
      name: file.name, 
      type: file.type, 
      size: file.size
    });

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      console.error('File is not an image:', file.type);
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Create a unique filename to avoid collisions
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Get the file extension from the original name
    const originalName = file.name;
    const ext = originalName.substring(originalName.lastIndexOf('.') || originalName.length);
    
    // Create a unique filename with original extension
    const fileName = `${uuidv4()}${ext}`;
    
    // Path to save the file
    const rootPath = cwd();
    console.log('Current working directory:', rootPath);
    
    // Change the path to use blog_uploads directory
    const blogImagesPath = join(rootPath, 'public', 'images', 'blog_uploads');
    const absoluteBlogImagesPath = resolve(blogImagesPath);
    console.log('Absolute path to blog images directory:', absoluteBlogImagesPath);
    
    // Ensure directory exists and is writable
    await ensureDirectoryExists(absoluteBlogImagesPath);
    
    const filePath = join(absoluteBlogImagesPath, fileName);
    console.log(`Writing file to: ${filePath}`);
    
    // Write the file
    try {
      await writeFile(filePath, buffer);
      console.log(`File written successfully: ${filePath}`);
      
      // Verify the file was created
      try {
        const fileStats = await stat(filePath);
        console.log(`File created with size: ${fileStats.size} bytes`);
        
        if (fileStats.size === 0) {
          console.error('File was created but is empty');
          throw new Error('File was created but is empty');
        }
      } catch (statError) {
        console.error('Error verifying file creation:', statError);
        throw new Error(`Failed to verify file creation: ${(statError as Error).message}`);
      }
    } catch (writeError) {
      console.error('Error writing file:', writeError);
      throw new Error(`Failed to write file: ${(writeError as Error).message}`);
    }
    
    // Return the public URL of the image
    const imageUrl = `/images/blog_uploads/${fileName}`;
    
    console.log(`File saved successfully, returning URL: ${imageUrl}`);
    
    return NextResponse.json({ 
      success: true,
      url: imageUrl
    });
  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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