import dbConnect from '@/lib/dbConnect'
import SearchableBlogs from '@/Components/ui/SearchableBlogs' // new component

export default async function Blogs() {
  const lo = dbConnect('Blogs')
  const blogs = await lo.find({}).sort({ publishedAt: -1 }).toArray()

  return <SearchableBlogs blogs={blogs} />
}