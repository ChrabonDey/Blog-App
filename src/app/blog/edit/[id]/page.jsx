'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditBlogPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    readTime: '',
    tags: '',
    coverImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  // Fetch blog data
  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blog) {
          const { title, content, readTime, tags, coverImage } = data.blog;
          setFormData({
            title,
            content,
            readTime,
            tags: tags.join(', '),
            coverImage,
          });
        } else {
          setStatus('Blog not found.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setStatus('Failed to load blog data.');
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
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()),
      }),
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Blog Updated!',
        text: 'Your changes have been saved successfully.',
        confirmButtonColor: '#2563eb',
      }).then(() => {
        router.push(`/blog/${id}`);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Could not update blog. Try again.',
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">
        <div className="animate-pulse">Loading blog...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6">Edit Blog</h1>

        {status && (
          <p className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded border border-red-200">
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            placeholder="Read Time (e.g., 5)"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Blog Content"
            rows={10}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
