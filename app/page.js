
import Link from 'next/link';

async function getArticles() {
  const SHEET_ID = '1AY7skQKYPST-CczQFQTtu99HUuIjxFHypETfiqDIs1Q';
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const text = await response.text();
  const rows = text.split('\n').slice(1); 
  return rows.map(row => {
    const columns = row.split('","').map(col => col.replace(/"/g, ''));
    const theme = columns[0] || "";
    return {
      theme: theme,
      slug: theme.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    };
  });
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="max-w-4xl mx-auto py-20 px-6 font-serif text-stone-900">
      <header className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-4 tracking-tighter">Tif & ses Gourmandises</h1>
        <p className="text-stone-500 italic text-xl">L'art de recevoir et le plaisir de la table</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {articles.map((article) => (
          <Link href={`/article/${article.slug}`} key={article.slug} className="group border-b border-stone-200 pb-8 block">
            <h2 className="text-3xl font-semibold mb-3 group-hover:text-stone-600 transition-colors">
              {article.theme}
            </h2>
            <p className="text-stone-500">Découvrir l'article complet →</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
