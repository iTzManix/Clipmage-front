"use client";
import Shortcuts from "@/components/Shortcuts";
import dynamic from "next/dynamic";
import { Inter, Lobster } from "next/font/google";

const KofiWidget = dynamic(() => import("@/components/KofiWidget"), {
  ssr: false,
  loading: () => null,
});

const lobster = Lobster({
  weight: "400",
  style: ["normal"],
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="min-h-screen py-3 px-4">
      <div className="max-w-5xl mx-auto space-y-4">
        <header className="text-center space-y-3">
          <h1
            className={`${lobster.className} font-bold text-5xl sm:text-6xl md:text-7xl bg-linear-to-r from-blue-600 inline-block to-yellow-600 text-transparent bg-clip-text pb-3`}
          >
            Clipmage
          </h1>
          <p
            className={`${inter.className} font-medium text-balance max-w-2xl mx-auto text-sm sm:text-base px-4`}
          >
            Instant OCR for Windows. Extract text from anywhere on your screen
            (images, videos, PDFs, apps) with a simple keyboard shortcut.
            Select, capture, and automatically copy to the clipboard.
          </p>
        </header>
        <nav
          className="flex gap-2 flex-wrap justify-center"
          aria-label="Download and repository links"
        >
          <a
            href="https://github.com/iTzManix/Clipmage/releases/download/tag-v1.0.1/Clipmage.exe"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Download
          </a>
          <a
            target="_blank"
            href="https://github.com/iTzManix/Clipmage"
            className="px-6 py-2.5 bg-linear-to-r from-purple-600 to-sky-400 rounded-lg hover:bg-amber-700 transition-colors font-medium text-white"
          >
            Repository
          </a>
        </nav>
        <section className={`${inter.className} py-5 -mt-6`}>
          <div className="mx-auto max-w-3xl rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 px-4 sm:px-6 py-6">
            <Shortcuts initialId="capture" />
          </div>
        </section>

        <footer className="text-center -mt-2">
          <p
            className={`${lobster.className} bg-linear-to-r from-green-400 inline-block to-green-700 text-transparent bg-clip-text font-bold text-4xl`}
          >
            @iTzManix
          </p>
          <nav
            className="flex gap-4 justify-center mt-2"
            aria-label="Social media links"
          >
            <a
              className="p-2 size-12 rounded-full flex justify-center items-center hover:scale-110 transition-transform bg-linear-to-r from-purple-600 to-sky-400 "
              href="https://github.com/iTzManix"
              target="_blank"
              aria-label="GitHub"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
              >
                <use xlinkHref="/assets/sprite.svg#github" />
              </svg>
            </a>
            <a
              className="bg-sky-200 p-2 size-12 rounded-full flex justify-center items-center hover:scale-110 transition-transform"
              href="https://www.linkedin.com/in/edwin-alvaro-mamani-choque-957463396/"
              aria-label="LinkedIn"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 256 256"
                aria-hidden="true"
              >
                <use xlinkHref="/assets/sprite.svg#linkedin" />
              </svg>
            </a>
          </nav>
        </footer>

        <KofiWidget />
      </div>
    </main>
  );
}
