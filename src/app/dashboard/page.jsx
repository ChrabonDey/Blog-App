// File: app/dashboard/page.jsx
import { currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect';
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import DeleteBlogButton from '@/components/DeleteBlogButton';

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) return null;

  const db = await dbConnect('Blogs');
  const blogs = await db.find({ userId: user.id }).toArray();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.firstName || user.email}</h1>

      <div className="flex space-x-4 mb-6">
        <Link href="/blog/new">
          <button className="btn btn-primary">+ New Blog</button>
        </Link>
        <button className="btn btn-outline">Your Blogs</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.length > 0 ? blogs.map((blog) => (
          <div key={blog._id} className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow">
            <div className="mb-2 text-xs text-gray-500">
              {new Date(blog.publishedAt).toLocaleDateString()} • {blog.readTime} min read
            </div>
            <h2 className="text-xl font-semibold mb-1 truncate">{blog.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{blog.content?.slice(0, 100)}...</p>
            <div className="flex justify-between items-center text-sm">
              <div className="space-x-3">
                <Link href={`/blog/edit/${blog._id}`} className="text-blue-600 hover:underline">Edit</Link>
                <Link href={`/blog/${blog._id}`} className="text-green-600 hover:underline">View</Link>
              </div>
              <DeleteBlogButton blogId={blog._id.toString()} />
            </div>
          </div>
        )) : (
          <p className="text-gray-500 col-span-full text-center">You haven’t created any blogs yet.</p>
        )}
      </div>
    </div>
  );
}
