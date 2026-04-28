import ReactMarkdown from 'react-markdown';

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
      text: columns[1] || "",
      slug: theme.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    };
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const articles = await getArticles();
  const article = articles.find(a => a.slug === slug);

  if (!article) return <div className="p-20 text-center">Article non trouvé</div>;

  return (
    <main className="max-w-3xl mx-auto py-20 px-6 font-serif">
      <a href="/" className="text-stone-500 hover:text-stone-800 mb-10 inline-block">← Retour</a>
      <article className="prose prose-stone lg:prose-xl">
        <h1 className="text-5xl font-bold mb-10 text-stone-900">{article.theme}</h1>
        <ReactMarkdown>{article.text}</ReactMarkdown>
      </article>
    </main>
  );
}
