import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { getAuth } from '@clerk/nextjs/server';

// DELETE handler
export async function DELETE(req, { params }) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await dbConnect('Blogs');
  const blog = await db.findOne({ _id: new ObjectId(params.id) });

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  if (blog.userId !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await db.deleteOne({ _id: new ObjectId(params.id) });

  return NextResponse.json({ message: 'Blog deleted successfully' });
}

// GET handler
export async function GET(request, { params }) {
  const { id } = params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const db = await dbConnect('Blogs');
    const blog = await db.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error('GET /api/blog/[id] error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// ✅ PUT handler — REQUIRED
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const body = await req.json();

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
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
