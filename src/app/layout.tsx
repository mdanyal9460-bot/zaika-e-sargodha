import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Headings: Elegant Serif font
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body: Modern Sans-Serif font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { CartProvider } from "@/context/CartContext";
import { TrackingProvider } from "@/context/TrackingContext";
import CartSidebar from "@/components/CartSidebar";
import OrderTracker from "@/components/OrderTracker";
import AuthModal from "@/components/AuthModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Zaika-e-Sargodha | Premium Authentic Pakistani Food",
  description: "Authentic homemade Pakistani food prepared with premium ingredients and delivered with care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <TrackingProvider>
            {children}
            <CartSidebar />
            <OrderTracker />
            <AuthModal />
            <FloatingWhatsApp />
            <Footer />
            <Toaster position="bottom-center" />
            
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Restaurant",
                  "name": "Zaika-e-Sargodha",
                  "image": "https://zaika-e-sargodha.vercel.app/hero.png",
                  "description": "Authentic homemade Pakistani food prepared with premium ingredients and delivered with care.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Main Boulevard",
                    "addressLocality": "Sargodha",
                    "addressRegion": "Punjab",
                    "addressCountry": "PK"
                  },
                  "servesCuisine": "Pakistani",
                  "priceRange": "$$",
                  "telephone": "+923000000000"
                })
              }}
            />
          </TrackingProvider>
        </CartProvider>
      </body>
    </html>
  );
}
