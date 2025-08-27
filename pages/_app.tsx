import "@/styles/globals.css";
import TempEmailGenerator from "@/components/email/TempEmailGenerator";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Your persistent UI like navbar, footer, or in your case email generator */}
      <TempEmailGenerator />

      {/* Render the current page */}
      <Component {...pageProps} />
    </>
  );
}
