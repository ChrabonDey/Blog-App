'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import React from 'react';
import Swal from 'sweetalert2';

export default function DeleteBlogButton({ blogId }) {
  const { getToken } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This blog will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      const token = await getToken();

      const res = await fetch(`/api/blog/${blogId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your blog has been deleted.',
          confirmButtonColor: '#2563eb',
        });

        router.push('/dashboard');
      } else {
        const data = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: data.error || 'Could not delete blog.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while deleting.',
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  );
}
