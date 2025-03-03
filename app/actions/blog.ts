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

interface BlogPostForm {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readingTime: string;
  tags: string[];
  author: string;
}

export interface CreateBlogPostParams extends BlogPostForm {
  blogId: string;
  content: string;
  coverImage: string;
  isBanner: boolean;
  isFeatured: boolean;
}

export async function uploadToCloudinary(file: string, blogId: string, type: 'cover' | 'content') {
  try {
    // Determine if the file is a video based on the data URL
    const isVideo = file.startsWith('data:video');

    const uploadOptions = {
      resource_type: isVideo ? "video" : "auto",
      folder: `blogs/blog-${blogId}/${type}`,
      use_filename: true,
      unique_filename: true,
      timeout: 120000, // 2 minutes timeout for video uploads
      chunk_size: 6000000, // 6MB chunks for better upload handling
    };

    const result = await cloudinary.uploader.upload(file, uploadOptions);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

export async function createBlogPost(params: CreateBlogPostParams) {
  try {
    let content = params.content;
    
    // Extract all media URLs from the content
    const mediaRegex = /data:(image|video|audio)\/[^;]+;base64[^"]+/g;
    const mediaMatches = content.match(mediaRegex) || [];

    // Upload each media file to Cloudinary with progress tracking
    for (const mediaUrl of mediaMatches) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(mediaUrl, params.blogId, 'content');
        content = content.replace(mediaUrl, cloudinaryUrl);
      } catch (error) {
        console.error('Error uploading media:', error);
        throw new Error('Failed to upload media content. The file might be too large or in an unsupported format.');
      }
    }

    // Upload cover image if it's a base64 string
    let coverImageUrl = params.coverImage;
    if (params.coverImage.startsWith('data:')) {
      try {
        coverImageUrl = await uploadToCloudinary(params.coverImage, params.blogId, 'cover');
      } catch (error) {
        console.error('Error uploading cover image:', error);
        throw new Error('Failed to upload cover image. The file might be too large or in an unsupported format.');
      }
    }

    // Create the blog post
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        content,
        coverImage: coverImageUrl,
        isBanner: Boolean(params.isBanner),
        isFeatured: Boolean(params.isFeatured)
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
