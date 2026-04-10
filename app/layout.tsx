import type { Metadata } from "next";
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const bebasNeueFont = Bebas_Neue({
  subsets: ["latin"],
  variable: "--bebas-neue",
  weight: ["400"],
});

const ibmPlexSansFont = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "",
  icons: {
    icon: { href: "/favicon.ico", url: "/favicon.ico" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        ibmPlexSansFont.variable,
        bebasNeueFont.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
