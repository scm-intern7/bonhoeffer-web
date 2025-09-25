import { Montserrat } from "next/font/google";
import { TranslationProvider } from "../translation/useTranslation";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Bonhoeffer Machines - Quality Agricultural & Industrial Equipment",
    template: "%s | Bonhoeffer Machines"
  },
  description: "Leading manufacturer of high-quality agricultural and industrial machinery including generators, water pumps, lawn mowers, chainsaws, and more. Trusted worldwide for reliable, durable equipment with comprehensive warranty and support.",
  keywords: ["agricultural machinery", "industrial equipment", "generators", "water pumps", "lawn mowers", "chainsaws", "gasoline engines", "diesel engines", "farming equipment", "Bonhoeffer Machines"],
  authors: [{ name: "Bonhoeffer Machines" }],
  creator: "Bonhoeffer Machines",
  publisher: "Bonhoeffer Machines",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bonhoeffermachines.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bonhoeffermachines.com',
    siteName: 'Bonhoeffer Machines',
    title: 'Bonhoeffer Machines - Quality Agricultural & Industrial Equipment',
    description: 'Leading manufacturer of high-quality agricultural and industrial machinery including generators, water pumps, lawn mowers, chainsaws, and more. Trusted worldwide for reliable, durable equipment.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bonhoeffer Machines - Quality Agricultural & Industrial Equipment',
    description: 'Leading manufacturer of high-quality agricultural and industrial machinery. Trusted worldwide for reliable, durable equipment.',
    creator: '@bonhoeffermachines',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#989b2e" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://bonhoeffermachines.com" />
      </head>
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
