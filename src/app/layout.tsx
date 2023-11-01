import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extension Book",
  description: "An app to manage company extension number",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#F4F6F9] h-full w-screen mb-56">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
