import {
  supportedReceptionModes,
  supportedShippingModes,
  supportedShippingParties,
  supportedShippingTypes,
} from "../../utils/constants"
import {
  bigint,
  mysqlTable,
  varchar,
  mysqlEnum,
  timestamp,
  tinyint,
  int,
  double,
} from "drizzle-orm/mysql-core"

export const packages = mysqlTable("packages", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  shippingParty: mysqlEnum("shipping_party", supportedShippingParties)
    .notNull()
    .default("FIRST_PARTY"),
  shippingMode: mysqlEnum("shipping_mode", supportedShippingModes).notNull(),
  shippingType: mysqlEnum("shipping_type", supportedShippingTypes).notNull(),
  receptionMode: mysqlEnum("reception_mode", supportedReceptionModes).notNull(),
  weightInKg: double("weight_in_kg", {
    precision: 8,
    scale: 2,
  }),
  senderFullName: varchar("sender_full_name", { length: 100 }).notNull(),
  senderContactNumber: varchar("sender_contact_number", {
    length: 15,
  }).notNull(),
  senderEmailAddress: varchar("sender_email_address", {
    length: 100,
  }).notNull(),
  senderStreetAddress: varchar("sender_street_address", {
    length: 255,
  }).notNull(),
  senderCity: varchar("sender_city", {
    length: 100,
  }).notNull(),
  senderStateOrProvince: varchar("sender_state_province", {
    length: 100,
  }).notNull(),
  // Uses ISO 3166-1 alpha-3 format.
  // See: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
  senderCountryCode: varchar("sender_country_code", { length: 3 }).notNull(),
  senderPostalCode: int("sender_postal_code").notNull(),
  receiverFullName: varchar("receiver_full_name", { length: 100 }).notNull(),
  receiverContactNumber: varchar("receiver_contact_number", {
    length: 15,
  }).notNull(),
  receiverEmailAddress: varchar("receiver_email_address", {
    length: 100,
  }).notNull(),
  receiverStreetAddress: varchar("receiver_street_address", {
    length: 255,
  }).notNull(),
  receiverBarangay: varchar("receiver_barangay", {
    length: 100,
  }).notNull(),
  receiverCity: varchar("receiver_city", {
    length: 100,
  }).notNull(),
  receiverStateOrProvince: varchar("receiver_state_province", {
    length: 100,
  }).notNull(),
  // Uses ISO 3166-1 alpha-3 format.
  // See: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
  receiverCountryCode: varchar("receiver_country_code", {
    length: 3,
  }).notNull(),
  receiverPostalCode: int("receiver_postal_code").notNull(),
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  createdById: varchar("created_by_id", { length: 28 }).notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedById: varchar("updated_by_id", { length: 28 }).notNull(),
  createdInHubId: bigint("created_in_hub_id", { mode: "number" }).notNull(),
  isArchived: tinyint("is_archived").notNull().default(0),
})
