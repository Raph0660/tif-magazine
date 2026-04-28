import './globals.css'

export const metadata = {
  title: 'Tif et ses Gourmandises',
  description: 'Le magazine culinaire de luxe',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
