import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    console.log('Received blog data:', {
      ...data,
      isBanner: Boolean(data.isBanner),
      isFeatured: Boolean(data.isFeatured)
    });

    // Create new blog post with explicit boolean values
    const blogData = {
      ...data,
      isBanner: Boolean(data.isBanner),
      isFeatured: Boolean(data.isFeatured)
    };

    // Create and save in one step
    const newBlog = await Blog.create(blogData);

    // Force a refresh from the database
    const savedBlog = await Blog.findById(newBlog._id);

    if (!savedBlog) {
      throw new Error('Failed to create blog post');
    }

    console.log('Created blog:', savedBlog.toJSON());

    return NextResponse.json({ 
      message: 'Blog post created successfully',
      post: savedBlog
    });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
