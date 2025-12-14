import Script from "next/script";

export default function ServerLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/favicon.png"
        />

        {/* Google Analytics with Consent Mode */}
        <Script
          id="gtag-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent to denied (GDPR compliant)
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted'
              });
              
              // Check for existing consent
              try {
                var stored = localStorage.getItem('supracarer_cookie_consent');
                if (stored) {
                  var consent = JSON.parse(stored);
                  if (consent.analytics) {
                    gtag('consent', 'update', { 'analytics_storage': 'granted' });
                  }
                  if (consent.marketing) {
                    gtag('consent', 'update', {
                      'ad_storage': 'granted',
                      'ad_user_data': 'granted',
                      'ad_personalization': 'granted'
                    });
                  }
                  if (consent.functional) {
                    gtag('consent', 'update', {
                      'functionality_storage': 'granted',
                      'personalization_storage': 'granted'
                    });
                  }
                }
              } catch (e) {}
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                cookie_flags: 'SameSite=None;Secure',
                cookie_expires: 63072000,
                send_page_view: false
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
