import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NexusPort | Futuristic 3D Portfolio",
  description: "A futuristic 3D portfolio showcasing developer skills and projects",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Rajdhani:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="nexusport-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
