import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { blogPosts, getPost } from "@/lib/data/content";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        title={post.title}
        description={`${post.category} · ${post.date} · ${post.readTime} read`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <article className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-lg text-muted leading-relaxed">{post.excerpt}</p>
          <div className="mt-10 space-y-6">
            {post.content.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-12">
            <Link href="/blog">Back to insights</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
