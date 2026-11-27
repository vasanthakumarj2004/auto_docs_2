import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogs,
  getBlogBySlug,
  getRelatedBlogs,
} from "@/src/content/blogs";
import { LandingNavigation } from "@/src/components/LandingNavigation";
import { DocsynecxFooter } from "@/src/components/DocsynecxFooter";
import { BlogPostView } from "@/src/components/blogs/BlogPostView";
import base from "@/src/components/LandingPage.module.css";
import {
  constructMetadata,
  getSeoData,
  articleSchema,
  jsonLd,
} from "@/src/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Not Found | Docsynecx Document AI",
      robots: { index: false, follow: false },
    };
  }

  // Check if specific SEO sheet recommendation exists for this article
  const blogUrl = `/blogs/${resolvedParams.slug}/`;
  const specificSeo = getSeoData(blogUrl);
  if (specificSeo) {
    return constructMetadata(blogUrl, {
      openGraph: {
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.imageAlt || specificSeo.seoTitle,
          },
        ],
      },
    });
  }

  const description = post.excerpt || post.subtitle || post.title;

  return constructMetadata("/blogs/", {
    title: { absolute: `${post.title} | Docsynecx Blog` },
    description,
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: `${post.title} | Docsynecx Blog`,
      description,
      url: `https://docsynecx.com${blogUrl}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
  });
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
  const blogUrl = `/blogs/${resolvedParams.slug}/`;

  return (
    <div className={base.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(articleSchema(post, blogUrl)),
        }}
      />
      <a href="#main-content" className={base.skipLink}>
        Skip to content
      </a>
      <LandingNavigation />
      <main id="main-content">
        <BlogPostView post={post} related={related} />
      </main>
      <DocsynecxFooter />
    </div>
  );
}
