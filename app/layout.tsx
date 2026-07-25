import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ScreenshotPro — Beautiful Screenshots for Modern Teams",
  description:
    "Capture, annotate, and share stunning screenshots in seconds. Built for teams who care about clarity.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-dvh bg-black font-sans antialiased">{children}</body>
    </html>
  )
}
