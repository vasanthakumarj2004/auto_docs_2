import type { Metadata } from "next";
import { getAllBlogs } from "@/src/content/blogs";
import { LandingNavigation } from "@/src/components/LandingNavigation";
import { DocsynecxFooter } from "@/src/components/DocsynecxFooter";
import { BlogListing } from "@/src/components/blogs/BlogListing";
import base from "@/src/components/LandingPage.module.css";
import { constructMetadata } from "@/src/lib/seo";

export const metadata: Metadata = constructMetadata("/blogs/");

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <div className={base.page}>
      <a href="#main-content" className={base.skipLink}>
        Skip to content
      </a>
      <LandingNavigation />
      <main id="main-content">
        <BlogListing initialPosts={posts} />
      </main>
      <DocsynecxFooter />
    </div>
  );
}
