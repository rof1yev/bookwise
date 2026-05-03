import type { Metadata } from "next";
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

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
  title: "BookWise - University Library System",
  description: "Manage books, borrow system, and library workflow easily",
  icons: {
    icon: { href: "/favicon.ico", url: "/favicon.ico" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        className={cn(
          "h-full",
          "antialiased",
          ibmPlexSansFont.variable,
          bebasNeueFont.variable,
        )}
      >
        <body>
          <Toaster richColors />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
