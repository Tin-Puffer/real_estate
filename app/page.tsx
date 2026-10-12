import { getDb } from "../db";
import { houses } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function Home() {
  const db = getDb();
  const list = await db
    .select()
    .from(houses)
    .where(eq(houses.status, "available"))
    .orderBy(desc(houses.createdAt));

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Nhà đang bán</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {list.map((h) => (
          <li key={h.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">
              <Link href={`/nha-ban/${h.slug}`}>{h.title}</Link>
            </h2>
            <p>
              {(h.price / 1e9).toFixed(1)} tỷ · {h.area} m² · {h.district}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
