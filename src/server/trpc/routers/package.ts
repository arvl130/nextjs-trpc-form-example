import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { packages } from "@/server/db/schema"
import {
  ReceptionMode,
  ShippingMode,
  ShippingType,
  supportedReceptionModes,
  supportedShippingModes,
  supportedShippingTypes,
} from "@/utils/constants"
import { eq } from "drizzle-orm"

export const packageRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(packages)
  }),
  create: publicProcedure
    .input(
      z.object({
        shippingMode: z.custom<ShippingMode>((val) =>
          supportedShippingModes.includes(val as ShippingMode)
        ),
        shippingType: z.custom<ShippingType>((val) =>
          supportedShippingTypes.includes(val as ShippingType)
        ),
        receptionMode: z.custom<ReceptionMode>((val) =>
          supportedReceptionModes.includes(val as ReceptionMode)
        ),
        weightInKg: z.number(),
        senderFullName: z.string().min(1).max(100),
        senderContactNumber: z.string().min(1).max(15),
        senderEmailAddress: z.string().min(1).max(100),
        senderStreetAddress: z.string().min(1).max(255),
        senderCity: z.string().min(1).max(100),
        senderStateOrProvince: z.string().min(1).max(100),
        senderCountryCode: z.string().min(1).max(3),
        senderPostalCode: z.number(),
        receiverFullName: z.string().min(1).max(100),
        receiverContactNumber: z.string().min(1).max(15),
        receiverEmailAddress: z.string().min(1).max(100),
        receiverStreetAddress: z.string().min(1).max(255),
        receiverBarangay: z.string().min(1).max(100),
        receiverCity: z.string().min(1).max(100),
        receiverStateOrProvince: z.string().min(1).max(100),
        receiverCountryCode: z.string().min(1).max(3),
        receiverPostalCode: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(packages).values({
        shippingMode: input.shippingMode,
        shippingType: input.shippingType,
        receptionMode: input.receptionMode,
        weightInKg: input.weightInKg,
        senderFullName: input.senderFullName,
        senderContactNumber: input.senderContactNumber,
        senderEmailAddress: input.senderEmailAddress,
        senderStreetAddress: input.senderStreetAddress,
        senderCity: input.senderCity,
        senderStateOrProvince: input.senderStateOrProvince,
        senderCountryCode: input.senderCountryCode,
        senderPostalCode: input.senderPostalCode,
        receiverFullName: input.receiverFullName,
        receiverContactNumber: input.receiverContactNumber,
        receiverEmailAddress: input.receiverEmailAddress,
        receiverStreetAddress: input.receiverStreetAddress,
        receiverBarangay: input.receiverBarangay,
        receiverCity: input.receiverCity,
        receiverStateOrProvince: input.receiverStateOrProvince,
        receiverCountryCode: input.receiverCountryCode,
        receiverPostalCode: input.receiverPostalCode,
        createdInHubId: 1,
        createdById: "user1234",
        updatedById: "user1234",
      })
    }),
  updateById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        shippingMode: z.custom<ShippingMode>((val) =>
          supportedShippingModes.includes(val as ShippingMode)
        ),
        shippingType: z.custom<ShippingType>((val) =>
          supportedShippingTypes.includes(val as ShippingType)
        ),
        receptionMode: z.custom<ReceptionMode>((val) =>
          supportedReceptionModes.includes(val as ReceptionMode)
        ),
        weightInKg: z.number(),
        senderFullName: z.string().min(1).max(100),
        senderContactNumber: z.string().min(1).max(15),
        senderEmailAddress: z.string().min(1).max(100),
        senderStreetAddress: z.string().min(1).max(255),
        senderCity: z.string().min(1).max(100),
        senderStateOrProvince: z.string().min(1).max(100),
        senderCountryCode: z.string().min(1).max(3),
        senderPostalCode: z.number(),
        receiverFullName: z.string().min(1).max(100),
        receiverContactNumber: z.string().min(1).max(15),
        receiverEmailAddress: z.string().min(1).max(100),
        receiverStreetAddress: z.string().min(1).max(255),
        receiverBarangay: z.string().min(1).max(100),
        receiverCity: z.string().min(1).max(100),
        receiverStateOrProvince: z.string().min(1).max(100),
        receiverCountryCode: z.string().min(1).max(3),
        receiverPostalCode: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.update(packages).set({
        shippingMode: input.shippingMode,
        shippingType: input.shippingType,
        receptionMode: input.receptionMode,
        weightInKg: input.weightInKg,
        senderFullName: input.senderFullName,
        senderContactNumber: input.senderContactNumber,
        senderEmailAddress: input.senderEmailAddress,
        senderStreetAddress: input.senderStreetAddress,
        senderCity: input.senderCity,
        senderStateOrProvince: input.senderStateOrProvince,
        senderCountryCode: input.senderCountryCode,
        senderPostalCode: input.senderPostalCode,
        receiverFullName: input.receiverFullName,
        receiverContactNumber: input.receiverContactNumber,
        receiverEmailAddress: input.receiverEmailAddress,
        receiverStreetAddress: input.receiverStreetAddress,
        receiverBarangay: input.receiverBarangay,
        receiverCity: input.receiverCity,
        receiverStateOrProvince: input.receiverStateOrProvince,
        receiverCountryCode: input.receiverCountryCode,
        receiverPostalCode: input.receiverPostalCode,
        createdInHubId: 1,
        createdById: "user1234",
        updatedById: "user1234",
      })
    }),
  deleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(packages).where(eq(packages.id, input.id))
    }),
})
