"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "../../lib/supabase";

const BASE_URL = "https://tracechain-five.vercel.app";

type Product = {
  id: string;
  name: string;
  status: string;
  history: {
    title: string;
    location: string;
    date: string;
  }[];
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function createProduct() {
    if (!id || !name || !status || !startLocation || !endLocation) {
      alert("Tüm alanları doldur.");
      return;
    }

    const newProduct = {
      id,
      name,
      status,
      history: [
        {
          title: "Ürün oluşturuldu",
          location: startLocation,
          date: new Date().toLocaleDateString("tr-TR"),
        },
        {
          title: status,
          location: endLocation,
          date: new Date().toLocaleDateString("tr-TR"),
        },
      ],
    };

    const { error } = await supabase.from("products").insert(newProduct);

    if (error) {
      alert("Ürün eklenemedi: " + error.message);
      return;
    }

    setId("");
    setName("");
    setStatus("");
    setStartLocation("");
    setEndLocation("");

    loadProducts();
  }

  function downloadQR(productId: string) {
    const svg = document.getElementById(`qr-${productId}`);
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${productId}-qr.svg`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">TraceChain Admin Panel</h1>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow text-gray-900">
          <h2 className="text-xl font-semibold">Yeni Ürün Oluştur</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input className="rounded border p-3 text-gray-900" placeholder="Ürün Kodu: BARCA-011" value={id} onChange={(e) => setId(e.target.value)} />
            <input className="rounded border p-3 text-gray-900" placeholder="Ürün Adı" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="rounded border p-3 text-gray-900" placeholder="Durum: Teslim Edildi" value={status} onChange={(e) => setStatus(e.target.value)} />
            <input className="rounded border p-3 text-gray-900" placeholder="Başlangıç Konumu: Barcelona" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
            <input className="rounded border p-3 text-gray-900" placeholder="Son Konum: İstanbul" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
          </div>

          <button
            onClick={createProduct}
            className="mt-4 rounded bg-black px-5 py-3 text-white"
          >
            Ürün Oluştur
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const productUrl = `${BASE_URL}/product/${product.id}`;

            return (
              <div key={product.id} className="rounded-2xl bg-white p-6 shadow text-gray-900">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="mt-1 text-gray-600">Ürün Kodu: {product.id}</p>

                <div className="mt-4 inline-block rounded-xl border bg-white p-4">
                  <QRCodeSVG id={`qr-${product.id}`} value={productUrl} size={180} />
                </div>

                <p className="mt-4 break-all text-sm text-gray-600">
                  {productUrl}
                </p>

                <div className="mt-4 flex gap-3">
                  <Link href={`/product/${product.id}`} className="rounded bg-black px-4 py-2 text-white">
                    Ürünü Aç
                  </Link>

                  <button onClick={() => downloadQR(product.id)} className="rounded bg-blue-600 px-4 py-2 text-white">
                    QR İndir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}