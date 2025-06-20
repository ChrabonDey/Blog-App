import dbConnect from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import React from 'react';
import { notFound } from 'next/navigation';

// Utility to format ISO date
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default async function BlogDetailsPage({ params }) {
  const { id } = params;

  // Connect to DB and fetch the blog by ID
  const db = await dbConnect('Blogs');
  let blog;

  try {
    blog = await db.findOne({ _id: new ObjectId(id) });
    if (!blog) return notFound();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By <span className="font-medium">{blog.author}</span> • {blog.readTime} min read • {formatDate(blog.publishedAt)}
      </div>

      {blog.tags && (
        <div className="mb-4 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <div className="prose max-w-none prose-lg">
        {blog.content}
      </div>
    </article>
  );
}
