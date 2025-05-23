import type { Metadata } from "next";
import { IBM_Plex_Serif,Inter} from "next/font/google";
import "./globals.css";

const ibmplexserif = IBM_Plex_Serif({
  variable:'--font-ibm-plex-serif',
  weight:["400","700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a Modern banking platform for everyone",
  icons:{
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmplexserif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
