import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Author meta tag */}
        <meta name="author" content="Samdev" />
      </Head>
      <body>
        {/* This is a hidden HTML comment for developers */}
        {/* Website designed and developed by Samdev - https://www.samdev.dev */}
        <Main />
        <NextScript />
        {/* Console log script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("Website designed and developed by Samdev - https://www.samdev.dev");
            `,
          }}
        />
      </body>
    </Html>
  );
}
