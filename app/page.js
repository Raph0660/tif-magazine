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
      theme,
      slug: theme.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    };
  }).filter(a => a.theme.length > 2);
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#1c1917] border-t-[12px] border-[#1c1917]/5">
      {/* HEADER SEO */}
      <header className="pt-16 pb-8 md:pt-24 md:pb-12 flex flex-col items-center px-6">
        <nav className="w-full max-w-5xl hidden md:flex justify-center text-[10px] uppercase tracking-[0.2em] mb-12 font-medium opacity-70">
          <span>Édition de Luxe 2026</span>
        </nav>
        <h1 className="font-serif text-4xl md:text-6xl tracking-widest uppercase text-center mb-6 leading-tight">
          Tif &amp; ses<br className="hidden md:block" /> Recettes en Cuisine
        </h1>
        <p className="font-serif italic text-sm md:text-base opacity-60 tracking-widest border-t border-b border-stone-200 py-2.5 px-10 text-center">
          Le site de vos succès en cuisine
        </p>
      </header>

      {/* GRILLE D'ARTICLES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`} className="group block">
              <article className="border-b border-stone-200 pb-8 hover:opacity-80 transition-opacity">
                <div className="aspect-[4/5] bg-stone-200 mb-6 flex items-center justify-center italic text-stone-400 font-serif p-8 text-center border border-black/5">
                  [ Photo : {article.theme} ]
                </div>
                <h2 className="font-serif text-2xl text-center leading-snug">{article.theme}</h2>
                <p className="text-[10px] uppercase tracking-widest text-center mt-4 text-[#a48437] font-bold">Découvrir l'édition →</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 py-12 mt-12 text-center">
        <div className="font-serif text-xl tracking-widest uppercase mb-6">T&amp;G</div>
        <div className="flex justify-center gap-8 text-[10px] uppercase tracking-widest opacity-60">
          <Link href="/mentions-legales">Mentions</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
