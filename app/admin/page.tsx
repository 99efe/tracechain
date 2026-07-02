import { products } from "../../data/products";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

const BASE_URL = "https://tracechain-five.vercel.app";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">TraceChain Admin Panel</h1>

        <p className="mt-2 text-gray-600">
          Her ürün için özel QR kodu ve takip linki.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const productUrl = `${BASE_URL}/product/${product.id}`;

            return (
              <div
                key={product.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <h2 className="text-xl font-semibold">{product.name}</h2>

                <p className="mt-1 text-gray-500">
                  Ürün Kodu: {product.id}
                </p>

                <div className="mt-4 rounded-xl border bg-white p-4">
                  <QRCodeSVG value={productUrl} size={180} />
                </div>

                <p className="mt-4 break-all text-sm text-gray-500">
                  {productUrl}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
                >
                  Ürünü Aç
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}