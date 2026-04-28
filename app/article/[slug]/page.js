import ReactMarkdown from 'react-markdown';

// Fonction pour récupérer les données du Google Sheet
async function getArticles() {
  const SHEET_ID = '1AY7skQKYPST-CczQFQTtu99HUuIjxFHypETfiqDIs1Q';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
  
  const response = await fetch(url, { next: { revalidate: 3600 } }); // Met à jour le cache chaque heure
  const text = await response.text();
  
  // Transformation du CSV en tableau d'objets
  const rows = text.split('\n').slice(1); 
  return rows.map(row => {
    const columns = row.split('","').map(col => col.replace(/"/g, ''));
    const theme = columns[0] || "";
    return {
      theme: theme,
      text: columns[1] || "",
      // On crée le "slug" (l'URL) à la volée
      slug: theme.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    };
  });
}

// La page de l'article proprement dite
export default async function ArticlePage({ params }) {
  const { slug } = params;
  const articles = await getArticles();
  
  // On cherche l'article qui correspond à l'URL
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <div className="p-20 text-center">Article non trouvé</div>;
  }

  return (
    <main className="max-w-3xl mx-auto py-20 px-6 font-serif">
      <a href="/" className="text-stone-500 hover:text-stone-800 transition mb-10 inline-block">
        ← Retour au magazine
      </a>
      
      <article className="prose prose-stone lg:prose-xl">
        <h1 className="text-5xl font-bold mb-10 text-stone-900 leading-tight">
          {article.theme}
        </h1>
        
        <div className="text-stone-700 leading-relaxed space-y-6">
          <ReactMarkdown>{article.text}</ReactMarkdown>
        </div>
      </article>

      <footer className="mt-20 pt-10 border-t border-stone-200 text-stone-400 italic text-sm">
        Publié originellement par Tif et ses Gourmandises.
      </footer>
    </main>
  );
}
