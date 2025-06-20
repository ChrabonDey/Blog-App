import Blog from "@/Components/Blog";
import Features from "@/Components/Features";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import RecentBlogsSection from "@/Components/RecentBlogsSection";




export default function Home() {
  return (
    <>
     <div className="my-10">
      <Hero></Hero>
     </div>
     <div className="my-10">
      <RecentBlogsSection></RecentBlogsSection>
     </div>
      <Blog></Blog>

       <div className="my-10">
      <Features></Features>
     </div>
       <div className="my-10">
      <Footer></Footer>
     </div>
    
    </>
  );
}
