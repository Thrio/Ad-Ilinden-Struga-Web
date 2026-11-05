import { League_Spartan, Schibsted_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/tailwind.css";

const display = League_Spartan({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});

const body = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--font-body",
  display: "swap",
});

export function Document({ lang, children }: { lang: "mk" | "en"; children: ReactNode }) {
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
