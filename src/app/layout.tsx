import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";

export const metadata: Metadata = {
  title: "Recipe App",
  description: "Recipe App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{String(metadata.title) ?? "Recipe App"}</title>
        <meta name="description" content={metadata.description ?? "Recipe App"} />
      </head>
      <body className="flex flex-col min-h-screen"> 
        <div className="w-full bg-gray-800 text-white">
          <Navbar />
        </div>
        <div className="flex-grow p-6 md:p-12 bg-gray-50 overflow-y-auto">
          {children}
        </div>
        <Footer /> 
      </body>
    </html>
  );
}
