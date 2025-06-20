'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs'; // ✅ useAuth from Clerk
import React from 'react';

export default function DeleteBlogButton({ blogId }) {
  const { getToken } = useAuth(); // ✅ this gives us the session token
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const token = await
       getToken(); 

      const res = await fetch(`/api/blog/${blogId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send it in headers
        },
      });

      if (res.ok) {
        router.push('/dashboard'); // ✅ success redirect
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete blog');
      }
    } catch (err) {
      alert('Error deleting blog');
      console.error(err);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:underline">
      Delete
    </button>
  );
}
