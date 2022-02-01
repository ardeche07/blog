import Script from "next/script";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import theme from "components/theme";
import { GTMPageView } from "utils/gtm";
import { utmValidator, gValidator } from "utils/utm-cookies";
import { Lato, UbuntuMono } from "components/Fonts";
import GlobalStyles from "components/GlobalStyles";

const { NEXT_PUBLIC_GTM_ID } = process.env;
const { NEXT_PUBLIC_GTAG_ID } = process.env;

const Analytics = () => {
  return (
    <>
      {NEXT_PUBLIC_GTM_ID && (
        <>
          {/* Google Tag Manager */}
          <Script id="script_gtm">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${NEXT_PUBLIC_GTM_ID}');`}
          </Script>

          {/* End Google Tag Manager */}
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${NEXT_PUBLIC_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
        </>
      )}
      {NEXT_PUBLIC_GTAG_ID && (
        <>
          {/* GTag */}
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GTAG_ID}`}
          />
          <Script id="script_gtag">
            {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', "${NEXT_PUBLIC_GTAG_ID}");`}
          </Script>
          {/* End GTag */}
        </>
      )}
    </>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const utmObj = router.query;
    const currentCookies = parseCookies();
    let existingUtmCookies = false;

    //check for existing utm cookies
    for (const key in utmValidator) {
      if (currentCookies[key]) existingUtmCookies = true;
    }

    for (const key in utmObj) {
      //check for gclid and gaid keys in params and set cookie
      if (gValidator.hasOwnProperty(key)) {
        setCookie(null, key, utmObj[key] as string, {
          maxAge: 365 * 24 * 60 * 60,
          path: "/",
        });
      }
      //if no utm cookies exist, set cookies if params contain utm keys
      if (!existingUtmCookies) {
        if (utmValidator.hasOwnProperty(key)) {
          setCookie(null, key, utmObj[key] as string, {
            maxAge: 365 * 24 * 60 * 60,
            path: "/",
          });
        }
      }
    }

    if (process.env.NODE_ENV !== "production") return;

    const onRouteChangeComplete = (url: string) => GTMPageView(url);

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    const cleanup = () =>
      router.events.off("routeChangeComplete", onRouteChangeComplete);

    return cleanup;
  }, [router.events, router.query]);

  return (
    <>
      <Analytics />
      <ThemeProvider theme={theme}>
        <Lato />
        <UbuntuMono />
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
