import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import User, { IUserDocument } from '@/models/User';
import { Types } from 'mongoose';

export async function GET() {
  try {
    const headersList = headers();
    // Wait for headers before using them
    const headersObj = await new Promise(resolve => {
      resolve(Object.fromEntries(headersList.entries()));
    });
    console.log('Request headers:', headersObj);

    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    if (!session) {
      console.log('No session found');
      return new NextResponse('Unauthorized - No session', { status: 401 });
    }

    if (session.user?.role !== 'admin') {
      console.log('User is not admin:', session.user?.role);
      return new NextResponse('Unauthorized - Not admin', { status: 401 });
    }

    // Connect to MongoDB
    await connectDB();

    // Fetch all users
    const users = await User.find().select('-password').lean<(IUserDocument & { _id: Types.ObjectId })[]>();
    console.log('Found users:', users.length);

    // Transform _id to id
    const sanitizedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return NextResponse.json(sanitizedUsers);
  } catch (error: any) {
    console.error('Detailed error in /api/admin/users:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
