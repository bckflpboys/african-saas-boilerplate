'use server';

import cloudinary from '@/lib/cloudinary';

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

export async function uploadToCloudinary(file: string) {
  try {
    // Generate a unique ID for this upload
    const uploadId = Date.now().toString();
    
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically detect if it's image, video, or raw
      folder: `blog-uploads/${uploadId}`, // Organize uploads in folders
      use_filename: true, // Use the original filename
      unique_filename: true, // Ensure filename is unique
    });

    if (!result || !result.secure_url) {
      throw new Error('Failed to get upload URL from Cloudinary');
    }

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error; // Throw the actual error for better debugging
  }
}

export async function createBlogPost(data: BlogPostData) {
  try {
    // Generate a unique ID for this blog post
    const blogId = Date.now().toString();
    
    // Extract all media URLs from the content
    const mediaRegex = /data:(image|video|audio)\/[^;]+;base64[^"]+/g;
    let content = data.content;
    const mediaMatches = content.match(mediaRegex) || [];

    // Upload each media file to Cloudinary in its respective folder
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
        blogId, // Store the blogId for future reference
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
