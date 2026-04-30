import { supabase } from '../lib/supabase'

export default async function Page() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')

  if (error) return <div className="p-20 text-red-500">Erreur : {error.message}</div>

  return (
    <div className="p-10 bg-[#fdfcf0] min-h-screen font-serif">
      <h1 className="text-5xl mb-10 border-b border-black pb-4">Tif & ses Machines</h1>
      <div className="grid gap-8">
        {products?.map((p) => (
          <div key={p.id} className="bg-white p-8 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-bold uppercase tracking-widest">{p.brand}</h2>
            <p className="text-xl mb-4 italic">{p.model}</p>
            <p className="text-2xl font-black text-black">{p.price_current} €</p>
            <div className="mt-6 inline-block bg-black text-white px-6 py-2 uppercase text-sm tracking-tighter">
              Vérifier la disponibilité
            </div>
          </div>
        ))}
      </div>
      {products?.length === 0 && <p className="mt-10 italic">La connexion est établie, mais aucune machine n'a encore été détectée.</p>}
    </div>
  )
}
