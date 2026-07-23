import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getOrganizationSchema } from '../lib/seo-schemas';
import { Metadata } from 'next';
import { readDB } from '../lib/backend-db';

export async function generateMetadata(): Promise<Metadata> {
  const db = readDB();
  const settings = db.settings;

  return {
    metadataBase: new URL('https://logicblaze.com'),
    title: {
      default: settings.defaultMetaTitle || 'LogicBlaze - Software Development, AI Solutions & Digital Marketing Agency',
      template: '%s | LogicBlaze'
    },
    description: settings.defaultMetaDesc || 'Premier Software Development & AI Agency. Web, Mobile, Desktop, AI Chatbots, & Technical SEO.',
    keywords: [
      'Software Development Company',
      'AI Solutions Agency',
      'Custom Web Application Development',
      'Mobile App Development iOS Android',
      'Desktop Application Developer',
      'AI Chatbot LLM Automation',
      'Digital Marketing SEO Agency'
    ],
    authors: [{ name: 'LogicBlaze Team' }],
    creator: 'LogicBlaze',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://logicblaze.com',
      title: settings.defaultMetaTitle || 'LogicBlaze - Premier Software Development & AI Agency',
      description: settings.defaultMetaDesc || 'Custom Web Apps, Mobile Apps, Desktop Software, AI Automation & SEO Growth.',
      siteName: 'LogicBlaze',
      images: [
        {
          url: 'https://logicblaze.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'LogicBlaze Software & AI Agency'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.defaultMetaTitle || 'LogicBlaze - Software Development & AI Agency',
      description: settings.defaultMetaDesc || 'Custom Web Apps, Mobile Apps, Desktop Software, AI Automation & SEO Growth.',
      creator: '@logicblaze'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const orgSchema = getOrganizationSchema();
  const db = readDB();
  const settings = db.settings;

  return (
    <html lang="en">
      <head>
        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {/* Global Google Analytics 4 Tag */}
        {settings.gaMeasurementId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaMeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.gaMeasurementId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Global Facebook Meta Pixel Code */}
        {settings.fbPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${settings.fbPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
