import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { blogPosts } from "@/lib/data/content";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Elevator maintenance tips, buying guides, technology insights, and safety articles from Tasheel Elevators.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Insights"
        description="Maintenance guidance, buying advice, and technology notes for building owners across Oman and the GCC."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-border bg-card p-7 transition hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-electric">
                <span>{post.category}</span>
                <span className="text-muted">·</span>
                <span className="text-muted normal-case tracking-normal">{post.readTime} read</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold group-hover:text-electric transition">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                Read article <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
