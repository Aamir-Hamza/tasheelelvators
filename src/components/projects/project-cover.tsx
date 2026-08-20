"use client";

type ProjectCoverProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

export function ProjectCover({ src, alt }: ProjectCoverProps) {
  if (!src) return null;

  return (
    // Native img avoids Next.js image-optimizer 404s on these covers.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  );
}
