import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { getAuth } from '@clerk/nextjs/server';

export async function DELETE(req, { params }) {
  const { userId } = getAuth(req); // ✅ Pass in request object

  console.log('🧠 HEADERS:', req.headers);
  console.log('🧠 USER:', userId);

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
