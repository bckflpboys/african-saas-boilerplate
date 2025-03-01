'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface BlogPostData {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readingTime: string;
  tags: string[];
  author: string;
}

async function uploadToCloudinary(file: string) {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically detect if it's image, video, or raw
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload media');
  }
}

export async function createBlogPost(data: BlogPostData) {
  try {
    // Extract all media URLs from the content
    const mediaRegex = /(data:image\/[^;]+;base64[^"]+)|data:video\/[^;]+;base64[^"]+|data:audio\/[^;]+;base64[^"]+/g;
    let content = data.content;
    const mediaMatches = content.match(mediaRegex) || [];

    // Upload each media file to Cloudinary
    for (const mediaUrl of mediaMatches) {
      const cloudinaryUrl = await uploadToCloudinary(mediaUrl);
      content = content.replace(mediaUrl, cloudinaryUrl);
    }

    // Upload cover image if it's a base64 string
    let coverImageUrl = data.coverImage;
    if (data.coverImage.startsWith('data:')) {
      coverImageUrl = await uploadToCloudinary(data.coverImage);
    }

    // Create the blog post
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        content,
        coverImage: coverImageUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create blog post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}
