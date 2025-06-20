'use client';

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function NewBlogPage() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    readTime: "",
    tags: "",
    coverImage: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
      userId: user.id,
      userEmail: user.primaryEmailAddress.emailAddress,
    };

    const response = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (response.ok) {
      alert("Blog posted successfully!");
      setStatus("✅ Blog posted successfully!");
      setFormData({
        title: "",
        content: "",
        readTime: "",
        tags: "",
        coverImage: "",
      });
    } else {
      setStatus("❌ Failed to post blog.");
    }
  };

  const handleGenerateBlog = async () => {
    if (!formData.title) {
      alert("Please enter a title first!");
      return;
    }

    setStatus("⚙️ Generating blog using Gemini AI...");

    try {
      const response = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title }),
      });

      const data = await response.json();

      if (response.ok && data.content) {
        setFormData((prev) => ({ ...prev, content: data.content }));
        setStatus("✅ Blog content generated and added to description!");
      } else {
        setStatus(`❌ ${data.error || "Failed to generate blog content."}`);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      setStatus("❌ Failed to generate blog due to network/server error.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create New Blog</h1>
      {status && <p className="mb-4 text-sm text-gray-700">{status}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title and AI Generation */}
        <div className="flex gap-4 items-center">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="button"
            onClick={handleGenerateBlog}
            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
          >
            Generate with AI
          </button>
        </div>

        {/* Other Fields */}
        <input
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          placeholder="Read Time (e.g., 5)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="w-full p-2 border rounded"
        />

        {/* Blog Description */}
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog content / description"
          rows={10}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
}
