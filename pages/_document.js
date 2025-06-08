import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <title>NewsNow - Conservative News Aggregator | Sports | Tech</title>
        <meta
          name="description"
          content="NewsNow is your daily source for top conservative news, sports headlines, and tech stories. Stay informed with the latest updates."
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />

{/* Google Analytics */}
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
      </body>
    </Html>
  );
}
