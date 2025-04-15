import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers"
import WhatsAppButton from "@/components/whatsapp-button"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SMILE MERCH - Merch de tus artistas favoritos",
  description: "Polos y pósters de calidad de la marca SMILE",
  icons: {
    icon: "/minilogitosmile.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Favicon clásico para navegadores y Google */}
        <link rel="icon" href="/minilogitosmile.png" type="image/png" />

        {/* JSON-LD: Datos estructurados para que Google reconozca el logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SMILE MERCH",
              "url": "https://www.smilemerch.com.pe",
              "logo": "https://www.smilemerch.com.pe/minilogitosmile.png",
            }),
          }}
        />

        {/* Script de Google Ads / Google Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16592582067"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16592582067');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            {children}
            <WhatsAppButton />
            <footer className="py-6 border-t border-gray-800 bg-black text-white">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <p>© {new Date().getFullYear()} SMILE. Todos los derechos reservados.</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <Link href="#" className="flex flex-col items-center">
                      <div className="relative w-8 h-8 mb-1">
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt="Libro de Reclamaciones"
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="text-xs text-gray-400">Libro de Reclamaciones</span>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
