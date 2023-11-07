import { packages } from "./schema"

export type Package = typeof packages.$inferSelect
export type NewPackage = typeof packages.$inferInsert
