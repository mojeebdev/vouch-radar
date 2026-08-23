import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vouch Radar — Find mutuals who can vouch",
  description: "Find X mutuals with unused Commons vouches and reach out before the campaign ends.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
