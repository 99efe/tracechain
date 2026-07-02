import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zsohjvuuhzekwciwdmtw.supabase.co";
const supabaseKey = "sb_publishable_sJq6P28D9HwtGFpsC_Jxqw_3icjXhvt";

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    id: "ZEYTIN-001",
    name: "Organik Zeytinyağı 1L",
    status: "Satıldı",
    history: [
      { title: "Üretildi", location: "Balıkesir", date: "02.07.2026" },
      { title: "Paketlendi", location: "Balıkesir", date: "03.07.2026" },
      { title: "Depoya Girdi", location: "İstanbul", date: "04.07.2026" },
      { title: "Satıldı", location: "Kadıköy, İstanbul", date: "06.07.2026" },
    ],
  },
  {
    id: "BARCA-002",
    name: "Barcelona Özel Forma",
    status: "Teslim Edildi",
    history: [
      { title: "Üretildi", location: "Barcelona, İspanya", date: "01.07.2026" },
      { title: "Türkiye’ye Ulaştı", location: "İstanbul", date: "04.07.2026" },
      { title: "Teslim Edildi", location: "Beşiktaş, İstanbul", date: "05.07.2026" },
    ],
  },
  {
    id: "KAHVE-003",
    name: "Kolombiya Kahvesi 500g",
    status: "Depoda",
    history: [
      { title: "Hasat Edildi", location: "Medellin, Kolombiya", date: "28.06.2026" },
      { title: "Depoya Girdi", location: "İzmir", date: "05.07.2026" },
    ],
  },
  {
    id: "CANTA-004",
    name: "Lüks Deri Çanta",
    status: "Mağazada",
    history: [
      { title: "Üretildi", location: "Milano, İtalya", date: "01.07.2026" },
      { title: "Mağazaya Ulaştı", location: "Nişantaşı, İstanbul", date: "06.07.2026" },
    ],
  },
  {
    id: "ILAC-005",
    name: "Soğuk Zincir İlaç Paketi",
    status: "Teslim Edildi",
    history: [
      { title: "Üretildi", location: "Basel, İsviçre", date: "01.07.2026" },
      { title: "Hastaneye Teslim", location: "Ankara", date: "04.07.2026" },
    ],
  },
  {
    id: "CILEK-006",
    name: "Organik Çilek Kasası",
    status: "Market Rafında",
    history: [
      { title: "Toplandı", location: "Antalya", date: "03.07.2026" },
      { title: "Market Rafına Çıktı", location: "İstanbul", date: "05.07.2026" },
    ],
  },
  {
    id: "SAAT-007",
    name: "Limitli Seri Akıllı Saat",
    status: "Satışta",
    history: [
      { title: "Üretildi", location: "Shenzhen, Çin", date: "25.06.2026" },
      { title: "Satış Noktasına Ulaştı", location: "İstanbul", date: "06.07.2026" },
    ],
  },
  {
    id: "KITAP-008",
    name: "İmzalı Koleksiyon Kitabı",
    status: "Teslim Edildi",
    history: [
      { title: "Basım Tamamlandı", location: "Ankara", date: "01.07.2026" },
      { title: "Teslim Edildi", location: "İzmir", date: "04.07.2026" },
    ],
  },
  {
    id: "PARFUM-009",
    name: "Fransız Parfüm 100ml",
    status: "Gümrükten Geçti",
    history: [
      { title: "Üretildi", location: "Grasse, Fransa", date: "29.06.2026" },
      { title: "Gümrükten Geçti", location: "İstanbul", date: "05.07.2026" },
    ],
  },
  {
    id: "BAL-010",
    name: "Doğal Çam Balı 850g",
    status: "Satıldı",
    history: [
      { title: "Hasat Edildi", location: "Muğla", date: "01.07.2026" },
      { title: "Satıldı", location: "Bursa", date: "06.07.2026" },
    ],
  },
];

const { error } = await supabase.from("products").upsert(products);

if (error) {
  console.error("Hata:", error.message);
} else {
  console.log("10 ürün Supabase'e aktarıldı.");
}