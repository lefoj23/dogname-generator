import type { Metadata } from "next";
import "./globals.scss";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./primereact-overrides.scss"; // custom styles to override primereact defaults
import ReduxProvider from "./providers/ReduxProvider";

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
          url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col min-w-full">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
