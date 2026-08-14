import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { GsapProvider } from "@/components/layout/gsap-provider";
import { Cursor } from "@/components/layout/cursor";
import { SmoothAnchorScroll } from "@/components/layout/smooth-anchor-scroll";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { StructuredData } from "@/components/seo/structured-data";
import { personSchema } from "@/lib/seo";
import { SITE_URL } from "@/data/navigation";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bhavya Chawla — Full-Stack Developer & Creative Technologist",
    template: "%s",
  },
  description:
    "Bhavya Chawla designs and engineers digital products — full-stack development, UI/UX, and creative web experiences built with Next.js, Three.js, and GSAP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <StructuredData data={personSchema()} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <GsapProvider>
            <Cursor />
            <SmoothAnchorScroll />
            <Nav />
            <ScrollProgress />
            <main className="flex-1">{children}</main>
            <Footer />
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
