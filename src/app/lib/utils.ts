import { hash, compare } from 'bcryptjs';

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

// Password verification
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

/**
 * Converts a string to a URL-friendly slug.
 * Transforms spaces to hyphens, converts to lowercase, and removes special characters.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/&/g, '-and-')     // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')   // Remove all non-word characters except hyphens
    .replace(/\-\-+/g, '-');    // Replace multiple hyphens with single hyphen
}

/**
 * Formats a date for display
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Truncates text to a specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Create excerpt from HTML content
export function createExcerpt(htmlContent: string, length: number = 150): string {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  return truncateText(textContent, length);
}

/**
 * Normalizes an image URL to ensure it's properly formatted
 * @param imageUrl The original image URL from the database
 * @returns A properly formatted image URL
 */
export function normalizeImageUrl(imageUrl: string | null | undefined): string {
  // Default fallback image - a known valid path
  const defaultImage = '/images/blog_uploads/default-blog-image.jpg';
  
  // If no image URL provided, return default
  if (!imageUrl || imageUrl.trim() === '') {
    console.log('No image URL provided, using default:', defaultImage);
    return defaultImage;
  }
  
  // Already properly formed URL (absolute or starting with /)
  if (imageUrl.startsWith('/') || imageUrl.startsWith('http')) {
    console.log('Using existing image URL:', imageUrl);
    return imageUrl;
  }
  
  // Add prefix for blog images - check if it's in the uploads directory
  const normalizedUrl = `/images/blog_uploads/${imageUrl}`;
  console.log('Normalized image URL from:', imageUrl, 'to:', normalizedUrl);
  return normalizedUrl;
} 