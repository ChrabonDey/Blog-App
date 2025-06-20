'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CardContainer, CardBody, CardItem } from './3d-card'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

export default function SearchableBlogs({ blogs }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4 text-black">All Blogs</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {filteredBlogs.map((blog) => (
          <CardContainer key={blog._id} className="inter-var">
            <div className="bg-white/5 text-black backdrop-blur-md rounded-2xl p-5 shadow-lg transition duration-300 hover:shadow-2xl border border-white/10">
              <CardBody className="gap-10">
                <CardItem translateZ="100" className="rounded-xl overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-2xl h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </CardItem>
                <div className="pt-5 space-y-4">
                  <h2 className="text-lg font-semibold line-clamp-2">{blog.title}</h2>
                  <p className="text-sm line-clamp-3">{blog.content.slice(0, 80)}...</p>
                  <div className="text-xs">
                    By <span className="font-medium">{blog.author}</span> • {blog.readTime} min read
                  </div>
                  <div className="text-xs text-gray-500">{formatDate(blog.publishedAt)}</div>
                  <div className="pt-4">
                    <Link
                      href={`/blog/${blog._id}`}
                      className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-700 transition"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </CardBody>
            </div>
          </CardContainer>
        ))}
      </div>

      {/* No Results */}
      {filteredBlogs.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No blogs found for "{searchTerm}".</div>
      )}
    </section>
  )
}
