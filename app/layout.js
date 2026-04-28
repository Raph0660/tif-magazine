import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-stone-50">{children}</body>
    </html>
  )
}
