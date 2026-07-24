import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DEFAULT_SEO_SETTINGS } from "@/lib/seo-store";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

// Environment variables fallback to admin defaults
const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || DEFAULT_SEO_SETTINGS.gtagId;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || DEFAULT_SEO_SETTINGS.metaPixelId;
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "cubix_search_console_token";

export const metadata: Metadata = {
  title: DEFAULT_SEO_SETTINGS.siteTitle,
  description: DEFAULT_SEO_SETTINGS.defaultMetaDescription,
  verification: {
    google: GOOGLE_VERIFICATION,
  },
  openGraph: {
    title: DEFAULT_SEO_SETTINGS.siteTitle,
    description: DEFAULT_SEO_SETTINGS.defaultMetaDescription,
    images: [DEFAULT_SEO_SETTINGS.defaultOgImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_SEO_SETTINGS.siteTitle,
    description: DEFAULT_SEO_SETTINGS.defaultMetaDescription,
    images: [DEFAULT_SEO_SETTINGS.defaultOgImage],
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
      className={`${plusJakartaSans.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Dynamic Injection of G-Tag (Google Analytics 4) */}
        {GTAG_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GTAG_ID}');
              `}
            </Script>
          </>
        )}

        {/* Dynamic Injection of Meta (Facebook) Pixel */}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#081b33] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
