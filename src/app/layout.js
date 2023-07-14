export const metadata = {
  title: 'NHS Galleri',
  description: 'Galleri client',
}

// Root layout of Galleri
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />

        <title>The NHS website - NHS Galleri</title>

        <link rel="preload" as="font" href="https://assets.nhs.uk/fonts/FrutigerLTW01-55Roman.woff2" type="font/woff2" crossorigin />
        <link rel="preload" as="font" href="https://assets.nhs.uk/fonts/FrutigerLTW01-65Bold.woff2" type="font/woff2" crossorigin />
        <link rel="preconnect  dns-prefetch" href="https://www.nhs.uk/" />
        <link rel="preconnect  dns-prefetch" href="https://assets.nhs.uk/" crossorigin></link>

        <link rel="stylesheet" href="/styles/css/sass.css" />

        <link rel="shortcut icon" href="/nhsuk-frontend/assets/favicons/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/nhsuk-frontend/assets/favicons/apple-touch-icon-180x180.png" />
        <link rel="mask-icon" href="/nhsuk-frontend/assets/favicons/favicon.svg" color="#005eb8" />
        <link rel="icon" sizes="192x192" href="/nhsuk-frontend/assets/favicons/favicon-192x192.png" />
        <meta name="msapplication-TileImage" content="/nhsuk-frontend/assets/favicons/mediumtile-144x144.png" />
        <meta name="msapplication-TileColor" content="#005eb8" />
        <meta name="msapplication-square70x70logo" content="/nhsuk-frontend/assets/favicons/smalltile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/nhsuk-frontend/assets/favicons/mediumtile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/nhsuk-frontend/assets/favicons/widetile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/nhsuk-frontend/assets/favicons/largetile-310x310.png" />
      </head>

      <body class="">
        {children}
      </body>
    </html>
  )
}
