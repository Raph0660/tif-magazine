export default function MentionsLegales() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6 font-serif text-stone-800">
      <h1 className="text-4xl font-bold mb-10 text-stone-900">Mentions Légales</h1>
      <section className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-xl font-bold mb-2">1. Éditeur du site</h2>
          <p>Le site "Tif & ses Recettes en Cuisine" est édité par Tif Cooking Lab.</p>
          <p>Contact : contact -at- tif-recettes.com</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">2. Hébergement</h2>
          <p>Siège Sociale : 66 Allée des Tulipes, Clermont 63100, France.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">3. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu (textes, images) est généré via intelligence artificielle et reste la propriété de l'éditeur.</p>
        </div>
      </section>
      <a href="/" className="mt-10 inline-block text-stone-500 hover:underline">← Retour à l'accueil</a>
    </main>
  );
}
