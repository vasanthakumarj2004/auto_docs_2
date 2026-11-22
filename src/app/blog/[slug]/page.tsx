import { StaticRedirect } from '@/src/components/StaticRedirect';
import { getAllBlogs } from '@/src/content/blogs';

export function generateStaticParams() {
  const posts = getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  return <StaticRedirect to={`/blogs/${resolved.slug}/`} />;
}
