// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
  import GmailnatorFetcher from '@/components/GmailnatorFetcher';
import '@/components/GmailnatorFetcher.css'; // add your file here

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GmailnatorFetcher /> {/* This will appear on every page */}
      {/* <Component {...pageProps} /> */}
    </>
  );
}
