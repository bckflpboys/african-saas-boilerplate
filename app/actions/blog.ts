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
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: `blogs/blog-${blogId}/${type}`,
      use_filename: true,
      unique_filename: true,
    });

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

    // Upload each media file to Cloudinary
    for (const mediaUrl of mediaMatches) {
      const cloudinaryUrl = await uploadToCloudinary(mediaUrl, params.blogId, 'content');
      content = content.replace(mediaUrl, cloudinaryUrl);
    }

    // Upload cover image if it's a base64 string
    let coverImageUrl = params.coverImage;
    if (params.coverImage.startsWith('data:')) {
      coverImageUrl = await uploadToCloudinary(params.coverImage, params.blogId, 'cover');
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
