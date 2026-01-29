import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atharva Joshi | Metro Portfolio",
  description: "A metro journey through my career - Full-Stack Developer & Creative Technologist",
  keywords: ["developer", "portfolio", "full-stack", "react", "next.js", "web development"],
  authors: [{ name: "Atharva Joshi" }],
  openGraph: {
    title: "Atharva Joshi | Metro Portfolio",
    description: "A metro journey through my career - Full-Stack Developer & Creative Technologist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharva Joshi | Metro Portfolio",
    description: "A metro journey through my career",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
