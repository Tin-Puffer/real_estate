import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const houses = sqliteTable("houses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // đơn vị: đồng
  area: integer("area"), // m2
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  direction: text("direction"), // hướng nhà
  legal: text("legal"), // sổ hồng, sổ đỏ...
  type: text("type"), // nhà phố, biệt thự, đất nền...
  district: text("district"),
  address: text("address"),
  status: text("status").notNull().default("available"), // available | sold
  createdAt: integer("created_at").notNull(), // unix timestamp
});

export const houseImages = sqliteTable("house_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  houseId: integer("house_id")
    .notNull()
    .references(() => houses.id, { onDelete: "cascade" }),
  path: text("path").notNull(), // đường dẫn trong R2
  alt: text("alt"),
  position: integer("position").notNull().default(0),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
});

export const houseTags = sqliteTable(
  "house_tags",
  {
    houseId: integer("house_id")
      .notNull()
      .references(() => houses.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.houseId, t.tagId] })],
);

export const consignments = sqliteTable("consignments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  expectedPrice: text("expected_price"),
  note: text("note"),
  imagePaths: text("image_paths"), // JSON mảng đường dẫn ảnh
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at").notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category").notNull().default("news"), // news | knowledge
  coverPath: text("cover_path"),
  publishedAt: integer("published_at"),
});
