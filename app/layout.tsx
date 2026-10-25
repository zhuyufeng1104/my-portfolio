import type { Metadata } from "next";
import { PortfolioProvider, Navigation, Footer } from "@/components/portfolio";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "FRAME / AI Visual Creator", template: "%s — FRAME" },
  description:
    "Independent AI image-making. Film, commercial concepts, live visuals, and creative experiments. Demo portfolio.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PortfolioProvider>
          <Navigation />
          {children}
          <Footer />
        </PortfolioProvider>
      </body>
    </html>
  );
}
