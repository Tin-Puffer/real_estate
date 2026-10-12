import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { getDb } from "../../../db";
import { houses } from "../../../db/schema";

export const dynamic = "force-dynamic";

async function getHouse(slug: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(houses)
    .where(eq(houses.slug, slug))
    .limit(1);
  return rows[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = await getHouse(slug);
  if (!h) return {};
  return {
    title: `${h.title} - ${(h.price / 1e9).toFixed(1)} tỷ`,
    description: h.description.slice(0, 160),
    openGraph: { title: h.title, description: h.description.slice(0, 160) },
  };
}

export default async function HousePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const h = await getHouse(slug);
  if (!h) notFound();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">{h.title}</h1>
      <p className="mt-2 text-lg">
        {(h.price / 1e9).toFixed(1)} tỷ · {h.area} m² · {h.bedrooms} PN ·{" "}
        {h.bathrooms} WC
      </p>
      <p className="mt-1 text-gray-600">{h.address}</p>
      <p className="mt-6 whitespace-pre-line">{h.description}</p>
    </main>
  );
}
