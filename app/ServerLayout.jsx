
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
      </head>
      <body>{children}</body>
    </html>
  );
}
