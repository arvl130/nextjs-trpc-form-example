import "@/styles/globals.css"
import { api } from "@/utils/api"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"

export default api.withTRPC(({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </>
  )
})
