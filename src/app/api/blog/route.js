import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
 // ✅ FIXED

// POST to create a blog
export async function POST(request) {
  try {
    const body = await request.json();
    const db = await dbConnect('Blogs');

    const blog = {
      ...body,
      publishedAt: new Date(),
    };

    const result = await db.insertOne(blog);

    return NextResponse.json({ message: 'Blog created', blogId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error saving blog:', error);
    return NextResponse.json({ message: 'Failed to create blog' }, { status: 500 });
  }
}

// DELETE to remove blog by ID


