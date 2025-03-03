import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const post = await Blog.findById(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const updateData = await request.json();
    
    // Update the blog post
    const updatedPost = await Blog.findByIdAndUpdate(
      params.slug,
      { 
        ...updateData,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Blog post updated successfully',
      post: updatedPost
    });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const deletedPost = await Blog.findByIdAndDelete(params.slug);

    if (!deletedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Blog post deleted successfully',
      post: deletedPost
    });
  } catch (error: any) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
