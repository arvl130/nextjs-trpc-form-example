import { initTRPC } from "@trpc/server"
import { CreateNextContextOptions } from "@trpc/server/adapters/next"
import { db } from "../db/client"
import SuperJSON from "superjson"

export async function createContext({ req, res }: CreateNextContextOptions) {
  return {
    db,
  }
}

const t = initTRPC.context<typeof createContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router
export const publicProcedure = t.procedure
