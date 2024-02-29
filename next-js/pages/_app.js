import 'styles/globals.css'
import 'styles/tailwind.css'
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <Script id="pageProps" strategy="lazyOnload">
        {`console.log(${JSON.stringify(pageProps)})`}
      </Script>
    </>
  )
}


