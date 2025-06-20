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
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const db = await dbConnect('Blogs');

    const update = {
      title: body.title,
      content: body.content,
      readTime: body.readTime,
      tags: body.tags,
      coverImage: body.coverImage,
    };

    const result = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: 'No changes made.' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Blog updated successfully.' });
  } catch (error) {
    console.error('PUT /api/blog/[id] error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}


// DELETE to remove blog by ID


