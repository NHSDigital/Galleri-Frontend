export const metadata = {
  title: "NHS Galleri",
  description: "Galleri client",
};

// Root layout of Galleri
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="">{children}</body>
    </html>
  );
}
