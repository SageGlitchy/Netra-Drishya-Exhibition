import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (for authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Photographer schema
export const photographers = pgTable("photographers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  profileImage: text("profile_image").notNull(),
  instagram: text("instagram"),
  email: text("email"),
  featured: boolean("featured").default(false),
});

export const insertPhotographerSchema = createInsertSchema(photographers).omit({
  id: true
});

// Category schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true
});

// Photo schema
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  photographerId: integer("photographer_id").notNull(),
  categoryId: integer("category_id").notNull(),
  featured: boolean("featured").default(false),
  dateAdded: timestamp("date_added").defaultNow(),
});

export const insertPhotoSchema = createInsertSchema(photos).omit({
  id: true,
  dateAdded: true
});

// Exhibition schema
export const exhibitions = pgTable("exhibitions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  coverImage: text("cover_image").notNull(),
  mapUrl: text("map_url"),
});

export const insertExhibitionSchema = createInsertSchema(exhibitions).omit({
  id: true
});

// Event schema (for events within the exhibition)
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  exhibitionId: integer("exhibition_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Photographer = typeof photographers.$inferSelect;
export type InsertPhotographer = z.infer<typeof insertPhotographerSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;

export type Exhibition = typeof exhibitions.$inferSelect;
export type InsertExhibition = z.infer<typeof insertExhibitionSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
