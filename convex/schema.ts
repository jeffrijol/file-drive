import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("csv"),
  v.literal("pdf")
);

export const fileTypeCat = v.union(
  v.literal("Administrativo"),
  v.literal("Inmueble"),
  v.literal("Otros")
);

export const filePeriods = v.union(
  v.literal("I-24"),
  v.literal("II-24"),
  v.literal("III-24"),
  v.literal("IV-24")
);

export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  files: defineTable({
    name: v.string(),
    type: fileTypes,
    orgId: v.string(),
    fileId: v.id("_storage"),
    userId: v.id("users"),
    typeCat: fileTypeCat,
    filePeriod: filePeriods,
    shouldDelete: v.optional(v.boolean()),
  })
    .index("by_orgId", ["orgId"])
    .index("by_shouldDelete", ["shouldDelete"]),
  favorites: defineTable({
    fileId: v.id("files"),
    orgId: v.string(),
    userId: v.id("users"),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    orgIds: v.array(
      v.object({
        orgId: v.string(),
        role: roles,
      })
    ),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
