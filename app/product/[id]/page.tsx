import { supabase } from "../../../lib/supabase";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-100 p-8 text-black">
        <h1 className="text-2xl font-bold">Ürün bulunamadı.</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow text-gray-900">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="mt-2 text-gray-600">Ürün Kodu: {product.id}</p>

        <p className="mt-2">
          Durum:
          <span className="ml-2 rounded bg-green-100 px-3 py-1 text-green-700">
            {product.status}
          </span>
        </p>

        <h2 className="mt-8 text-xl font-semibold">Ürün Geçmişi</h2>

        <div className="mt-6 space-y-4">
          {product.history.map(
            (
              item: {
                title: string;
                location: string;
                date: string;
              },
              index: number
            ) => (
              <div key={index} className="rounded-lg border p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600">{item.location}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}