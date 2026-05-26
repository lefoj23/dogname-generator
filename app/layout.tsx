import type { Metadata } from "next";
import "./globals.scss";
import "primereact/resources/themes/lara-light-blue/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import "./prime-overrides.scss";

export const metadata: Metadata = {
  title: "Dog Name Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
