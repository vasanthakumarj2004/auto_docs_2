import type { Metadata } from 'next';
import { getAllBlogs } from '@/src/content/blogs';
import { LandingNavigation } from '@/src/components/LandingNavigation';
import { FinanceFooter } from '@/src/components/FinanceFooter';
import { BlogListing } from '@/src/components/blogs/BlogListing';
import base from '@/src/components/LandingPage.module.css';

export const metadata: Metadata = {
  title: 'Blogs & Insights | Docsynecx Document AI',
  description:
    'Explore the latest insights, practical guides, and breakthroughs in AI document verification, logistics automation, enterprise compliance, and financial intelligence.',
  openGraph: {
    title: 'Blogs & Insights | Docsynecx Document AI',
    description:
      'Explore the latest insights, practical guides, and breakthroughs in AI document verification, logistics automation, enterprise compliance, and financial intelligence.',
  },
};

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
      <FinanceFooter />
    </div>
  );
}
