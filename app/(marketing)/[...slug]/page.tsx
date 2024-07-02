import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Metadata } from "next";

import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx-components";
import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

interface PageProps {
  params: {
    slug: string[];
  };
}

// Replace with your own data-fetching logic
async function getPageFromParams(params) {
  const slug = params?.slug?.join("/");
  const page = {
    slugAsParams: slug,
    title: "Sample Title",
    description: "Sample Description",
    body: {
      code: `# Sample Body Code`,
    },
  };

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", siteConfig.name);
  ogUrl.searchParams.set("mode", "light");

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slugAsParams),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
}

// Replace with your own data-fetching logic
export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return [
    {
      slug: ["sample-slug"],
    },
  ];
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  const mdxSource = await serialize(page.body.code);

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx source={mdxSource} />
    </article>
  );
}
