'use client';

import { useEffect } from 'react';

export default function DynamicScripts() {
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        // 1. Dynamic G-Tag Injection
        const gtagId = data.gtag_id || process.env.NEXT_PUBLIC_GTAG_ID;
        if (gtagId && !document.getElementById('dynamic-gtag-script')) {
          const script1 = document.createElement('script');
          script1.id = 'dynamic-gtag-script';
          script1.async = true;
          script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
          document.head.appendChild(script1);

          const script2 = document.createElement('script');
          script2.id = 'dynamic-gtag-init';
          script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}');
          `;
          document.head.appendChild(script2);
        }

        // 2. Dynamic Meta Pixel Injection
        const pixelId = data.meta_pixel_id || process.env.NEXT_PUBLIC_META_PIXEL_ID;
        if (pixelId && !document.getElementById('dynamic-pixel-script')) {
          const pixelScript = document.createElement('script');
          pixelScript.id = 'dynamic-pixel-script';
          pixelScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(pixelScript);
        }
      })
      .catch(() => {});
  }, []);

  return null;
}
