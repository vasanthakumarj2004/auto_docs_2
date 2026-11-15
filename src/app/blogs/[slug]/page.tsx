import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from '@/src/content/blogs';
import { LandingNavigation } from '@/src/components/LandingNavigation';
import { FinanceFooter } from '@/src/components/FinanceFooter';
import { BlogPostView } from '@/src/components/blogs/BlogPostView';
import base from '@/src/components/LandingPage.module.css';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Blog Not Found | Docsynecx Document AI',
    };
  }

  const description = post.excerpt || post.subtitle || post.title;

  return {
    title: `${post.title} | Docsynecx Blog`,
    description,
    openGraph: {
      title: `${post.title} | Docsynecx Blog`,
      description,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  const posts = getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogs(post.slug, post.category, 3);

  return (
    <div className={base.page}>
      <a href="#main-content" className={base.skipLink}>
        Skip to content
      </a>
      <LandingNavigation />
      <main id="main-content">
        <BlogPostView post={post} related={related} />
      </main>
      <FinanceFooter />
    </div>
  );
}
