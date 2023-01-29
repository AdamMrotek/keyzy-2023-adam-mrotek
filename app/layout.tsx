import "./globals.css";
import { Outfit } from "@next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // className={`${outfit.className}`}
    <html className={`${outfit.variable} text-navy`} lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-primary">{children}</body>
    </html>
  );
}
