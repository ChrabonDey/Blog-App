import dbConnect from '@/lib/dbConnect';
import Link from 'next/link';

export default async function RecentBlogsSection() {
  const lo = dbConnect('Blogs');
  const blogs = await lo.find({}).sort({ publishedAt: -1 }).limit(10).toArray();

  const featured = blogs[0];
  const others = blogs.slice(1, 5);
  const trending = blogs.slice(5, 10);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Featured Blog */}
      <div className="md:col-span-1">
        {featured && (
          <Link
            href={`/blog/${featured._id}`}
            className="block group space-y-4 p-4 border rounded-xl hover:shadow-lg transition"
          >
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <div className="text-sm text-gray-500">
              {featured.category || 'Culture'} • {formatDate(featured.publishedAt)}
            </div>
            <h2 className="text-2xl font-bold group-hover:text-blue-600 transition">
              {featured.title}
            </h2>
            <p className="text-sm text-gray-700 line-clamp-4">{featured.content}</p>
            <div className="text-sm text-gray-500 mt-2">By {featured.author}</div>
          </Link>
        )}
      </div>

      {/* Recent Blogs */}
      <div className="md:col-span-1 space-y-6">
        {others.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog._id}`}
            className="flex gap-4 hover:bg-gray-50 p-3 rounded-lg transition"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-24 h-24 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex flex-col justify-between space-y-1">
              <div className="text-xs text-gray-400">
                {blog.category || 'General'} • {formatDate(blog.publishedAt)}
              </div>
              <h3 className="text-md font-semibold text-gray-900 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2">{blog.content}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Trending List */}
      <div className="md:col-span-1 bg-gray-50 p-6 rounded-xl border">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Trending</h3>
        <ul className="space-y-4">
          {trending.map((blog, idx) => (
            <li key={blog._id}>
              <Link
                href={`/blog/${blog._id}`}
                className="text-sm font-medium text-gray-800 hover:text-blue-600 transition"
              >
                {idx + 1}. {blog.title}
              </Link>
              <div className="text-xs text-gray-500">by {blog.author}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
