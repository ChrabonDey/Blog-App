import dbConnect from '@/lib/dbConnect'
import React from 'react'
import Link from 'next/link'
import { CardContainer, CardBody, CardItem } from './ui/3d-card'

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function Blog() {
  const lo = dbConnect('Blogs')
  const blogs = await lo.find({}).sort({ publishedAt: -1 }).limit(6).toArray()

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-bold  text-left text-black">Latest Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
        {blogs.map((blog) => (
          <CardContainer key={blog._id} className="inter-var">
            <div className="bg-white/5 text-black backdrop-blur-md rounded-2xl p-5 shadow-lg transition duration-300 hover:shadow-2xl border border-white/10">
              <CardBody className="gap-10">
                
                {/* 3D Image */}
                <CardItem translateZ="100" className="rounded-xl overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-2xl h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </CardItem>

                {/* Blog Content */}
                <div className="pt-5 space-y-4">
                  <h2 className="text-lg font-semibold text-black line-clamp-2">{blog.title}</h2>

                  <p className="text-sm text-black line-clamp-3">
                    {blog.content.slice(0, 80)}...
                  </p>

                  <div className="text-xs text-black">
                    By <span className="font-medium text-black">{blog.author}</span> • {blog.readTime} min read
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
    </section>
  )
}
