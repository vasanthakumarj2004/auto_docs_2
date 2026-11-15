import { redirect } from 'next/navigation';

export default async function BlogSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await params;
  redirect(`/blogs/${resolved.slug}`);
}
