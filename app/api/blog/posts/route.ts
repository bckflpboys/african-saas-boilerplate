import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function POST(request: Request) {
  try {
    await connectDB();
    const blogData = await request.json();

    // Create new blog post
    const newBlog = await Blog.create(blogData);

    return NextResponse.json({ 
      message: 'Blog post created successfully',
      post: newBlog
    });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
