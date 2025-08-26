import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-white shadow-md font-bold text-xl">📨 Email Generator</header>
      <main className="flex-1 p-4">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
