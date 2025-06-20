'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditBlogPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    readTime: '',
    tags: '',
    coverImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  // Fetch existing blog data
  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          const { title, author, content, readTime, tags, coverImage } = data.blog;
          setFormData({
            title,
            author,
            content,
            readTime,
            tags: tags.join(', '),
            coverImage,
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, tags: formData.tags.split(',').map(t => t.trim()) }),
    });

    if (response.ok) {
      setStatus('Blog updated successfully!');
      router.push(`/blog/${id}`);
    } else {
      setStatus('Update failed.');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
      {status && <p className="mb-4">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border" required />
        <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border" required />
        <input name="readTime" value={formData.readTime} onChange={handleChange} placeholder="Read Time" className="w-full p-2 border" required />
        <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full p-2 border" required />
        <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="Cover Image URL" className="w-full p-2 border" />
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" rows={10} className="w-full p-2 border" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Blog</button>
      </form>
    </div>
  );
}
