import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NewsDetailClient } from "@/components/news-detail-client";
import { getNewsById } from "@/lib/news";

type NewsDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsById(id);

  if (!item) {
    return {
      title: "News Not Found | TruthChain",
    };
  }

  return {
    title: `${item.title} | TruthChain`,
    description: item.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const item = getNewsById(id);

  if (!item) {
    notFound();
  }

  return (
    <main className="shell">
      <div className="detailBackRow">
        <Link className="detailBackLink" href="/">
          Quay lại danh sách tin
        </Link>
      </div>
      <NewsDetailClient item={item} />
    </main>
  );
}
