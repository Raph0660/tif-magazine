import './globals.css'

export const metadata = {
  title: 'Tif & ses Recettes en Cuisine | Le Magazine Culinaire',
  description: 'Découvrez les meilleures recettes et astuces de Tif pour réussir tous vos plats en cuisine. Passion, gourmandise et partage.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased selection:bg-stone-200">
        {children}
      </body>
    </html>
  )
}
