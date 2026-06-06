export type Category = "skincare" | "makeup" | "haircare" | "fragrance" | "bodycare" | "tools";

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string[];
  benefits: string[];
  tags: Array<"bestseller" | "new" | "sale" | "limited">;
  stock: number;
  reviews: Review[];
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const brands = [
  "Glowify",
  "Maison Atelier",
  "Veil & Petal",
  "Aura Botanique",
  "Lume",
  "Noir & Rose",
];

export const categories: { key: Category; label: string; image: string }[] = [
  { key: "skincare",  label: "Skincare",  image: img("photo-1556228720-195a672e8a03") },
  { key: "makeup",    label: "Makeup",    image: img("photo-1586495777744-4413f21062fa") },
  { key: "haircare",  label: "Haircare",  image: img("photo-1626282874430-c11ae32d2898") },
  { key: "fragrance", label: "Fragrance", image: img("photo-1541643600914-78b084683601") },
  { key: "bodycare",  label: "Body Care", image: img("photo-1570194065650-d99fb4bedf0a") },
  { key: "tools",     label: "Tools",     image: img("photo-1631214540242-6fa6ddcef687") },
];

const r = (a: string, rating: number, text: string, date: string): Review => ({ author: a, rating, text, date });

type Seed = Omit<Product, "id" | "slug" | "gallery"> & { slug?: string; id?: string; gallery?: string[] };

const make = (seeds: Seed[]): Product[] =>
  seeds.map((s, i) => ({
    id: s.id ?? `p${i + 1}`,
    slug: s.slug ?? s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    gallery: s.gallery ?? [s.image],
    ...s,
  } as Product));

export const products: Product[] = make([
  {
    name: "Hydra-Satin Dew Serum", brand: "Glowify", category: "skincare", price: 68, oldPrice: 82,
    rating: 4.8, reviewCount: 412, image: img("photo-1556228720-195a672e8a03"),
    gallery: [img("photo-1556228720-195a672e8a03"), img("photo-1570194065650-d99fb4bedf0a"), img("photo-1611080626919-7cf5a9dbab5b")],
    description: "A weightless hyaluronic serum infused with botanical peptides for an immediate, satin-finish glow.",
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Centella Asiatica", "Rose Hip Oil"],
    benefits: ["Plumps fine lines", "72h hydration", "Restores luminosity"],
    tags: ["bestseller", "sale"], stock: 24,
    reviews: [r("Layla", 5, "My skin has never looked this dewy.", "2024-08-14"), r("Noor", 5, "Absolute holy grail.", "2024-07-02"), r("Sofia", 4, "Lovely texture, takes time to absorb.", "2024-06-21")],
  },
  {
    name: "Petal Tint Lip Balm", brand: "Veil & Petal", category: "makeup", price: 32,
    rating: 4.7, reviewCount: 289, image: img("photo-1586495777744-4413f21062fa"),
    gallery: [img("photo-1586495777744-4413f21062fa"), img("photo-1599733589046-833caccbbd03")],
    description: "A sheer, buildable rose tint with a satin-balm finish that melts into lips.",
    ingredients: ["Shea Butter", "Beetroot Extract", "Vitamin E"],
    benefits: ["Sheer flush of color", "Hydrating", "Cruelty-free"],
    tags: ["bestseller", "new"], stock: 58,
    reviews: [r("Aya", 5, "The most flattering rose ever.", "2024-08-01")],
  },
  {
    name: "Velvet Veil Setting Powder", brand: "Maison Atelier", category: "makeup", price: 45,
    rating: 4.6, reviewCount: 173, image: img("photo-1631730486572-226d1f595b68"),
    description: "Featherlight powder that blurs pores and locks makeup for hours.",
    ingredients: ["Silica", "Rice Powder", "Vitamin E"],
    benefits: ["Soft-focus finish", "12h wear", "Translucent"],
    tags: ["new"], stock: 41, reviews: [],
  },
  {
    name: "The Ritual Set", brand: "Glowify", category: "skincare", price: 120, oldPrice: 165,
    rating: 4.9, reviewCount: 521, image: img("photo-1570194065650-d99fb4bedf0a"),
    gallery: [img("photo-1570194065650-d99fb4bedf0a"), img("photo-1612817288484-6f916006741a")],
    description: "Three award-winning essentials for your morning ceremony.",
    ingredients: ["Includes cleanser, serum, moisturizer"],
    benefits: ["Complete routine", "Save 27%", "Travel friendly"],
    tags: ["bestseller", "limited", "sale"], stock: 12, reviews: [],
  },
  {
    name: "Golden Glow Hair Oil", brand: "Aura Botanique", category: "haircare", price: 72,
    rating: 4.8, reviewCount: 305, image: img("photo-1626282874430-c11ae32d2898"),
    description: "Argan and camellia oils restore shine and tame frizz without weight.",
    ingredients: ["Argan Oil", "Camellia Oil", "Vitamin E"],
    benefits: ["Mirror shine", "Heat protection", "Frizz control"],
    tags: ["bestseller"], stock: 30, reviews: [],
  },
  {
    name: "Cloud Milk Cleanser", brand: "Glowify", category: "skincare", price: 42,
    rating: 4.7, reviewCount: 218, image: img("photo-1620916566398-39f1143ab7be"),
    description: "Whipped milk cleanser that dissolves makeup while replenishing the moisture barrier.",
    ingredients: ["Oat Milk", "Glycerin", "Squalane"],
    benefits: ["Gentle", "pH balanced", "Daily use"],
    tags: ["new"], stock: 80, reviews: [],
  },
  {
    name: "Rose Mist Eau de Parfum", brand: "Noir & Rose", category: "fragrance", price: 95,
    rating: 4.9, reviewCount: 142, image: img("photo-1541643600914-78b084683601"),
    description: "Damask rose layered with white musk and a soft amber base.",
    ingredients: ["Damask Rose", "White Musk", "Amber"],
    benefits: ["8h wear", "Vegan", "Recyclable bottle"],
    tags: ["bestseller", "limited"], stock: 18, reviews: [],
  },
  {
    name: "Contour Crème Balm", brand: "Maison Atelier", category: "makeup", price: 64,
    rating: 4.6, reviewCount: 96, image: img("photo-1599948128020-9a44505b58d4"),
    description: "Buildable cream balm that sculpts with a soft-focus matte finish.",
    ingredients: ["Mineral Pigments", "Jojoba", "Vitamin E"],
    benefits: ["Blends seamlessly", "All-day wear", "3 shades"],
    tags: ["new"], stock: 45, reviews: [],
  },
  {
    name: "Silk Overnight Mask", brand: "Glowify", category: "skincare", price: 58,
    rating: 4.8, reviewCount: 263, image: img("photo-1612817288484-6f916006741a"),
    description: "A leave-on mask that resurfaces and softens overnight.",
    ingredients: ["AHA Complex", "Squalane", "Centella"],
    benefits: ["Smooths texture", "Wake up glowing", "Non-greasy"],
    tags: ["bestseller"], stock: 26, reviews: [],
  },
  {
    name: "Featherlight Mascara", brand: "Veil & Petal", category: "makeup", price: 28,
    rating: 4.5, reviewCount: 410, image: img("photo-1631214540242-6fa6ddcef687"),
    description: "Lengthens without clumps, removes with warm water.",
    ingredients: ["Bamboo Fiber", "Beeswax"],
    benefits: ["Lengthening", "Tubing formula", "Smudge-proof"],
    tags: ["new"], stock: 90, reviews: [],
  },
  {
    name: "Scalp Renew Tonic", brand: "Aura Botanique", category: "haircare", price: 52,
    rating: 4.7, reviewCount: 132, image: img("photo-1608248543803-ba4f8c70ae0b"),
    description: "Caffeine-infused tonic that revitalizes the scalp and supports density.",
    ingredients: ["Caffeine", "Biotin", "Peptides"],
    benefits: ["Stimulates roots", "Refreshes scalp", "Daily use"],
    tags: [], stock: 60, reviews: [],
  },
  {
    name: "Satin Blush Cream", brand: "Veil & Petal", category: "makeup", price: 36,
    rating: 4.6, reviewCount: 78, image: img("photo-1583241800698-9c2e2d0aebc3"),
    description: "A cushion-soft cream blush that diffuses into a healthy flush.",
    ingredients: ["Squalane", "Jojoba", "Mineral Pigments"],
    benefits: ["Dewy finish", "Buildable", "4 shades"],
    tags: ["new"], stock: 70, reviews: [],
  },
  // ---- New products ----
  {
    name: "Glass Skin Toner", brand: "Glowify", category: "skincare", price: 44,
    rating: 4.7, reviewCount: 198, image: img("photo-1608248511211-31aa730a1fb1"),
    description: "Mist-fine toner with fermented rice water for that glass-skin glow.",
    ingredients: ["Fermented Rice Water", "Niacinamide", "Polyglutamic Acid"],
    benefits: ["Refines pores", "Boosts radiance", "Preps skin"],
    tags: ["new", "bestseller"], stock: 65, reviews: [],
  },
  {
    name: "Velour Matte Lipstick", brand: "Noir & Rose", category: "makeup", price: 38, oldPrice: 48,
    rating: 4.8, reviewCount: 532, image: img("photo-1586495777744-4413f21062fa", 900),
    description: "A pillowy matte lipstick that wears like silk for 10 hours straight.",
    ingredients: ["Vegetable Wax", "Vitamin E", "Hyaluronic Acid"],
    benefits: ["No transfer", "Non-drying", "12 shades"],
    tags: ["bestseller", "sale"], stock: 110, reviews: [],
  },
  {
    name: "Citrine Eye Palette", brand: "Maison Atelier", category: "makeup", price: 78,
    rating: 4.9, reviewCount: 287, image: img("photo-1512496015851-a90fb38ba796"),
    description: "Twelve heirloom-finish shades inspired by Andalusian sunsets.",
    ingredients: ["Mica", "Pearl Pigments", "Squalane"],
    benefits: ["Buttery payoff", "Crease-proof base", "Vegan"],
    tags: ["limited", "new"], stock: 22, reviews: [],
  },
  {
    name: "Pearl Glow Highlighter", brand: "Lume", category: "makeup", price: 42,
    rating: 4.7, reviewCount: 164, image: img("photo-1522335789203-aaa2b1cbab63"),
    description: "A pressed pearl highlighter that catches every angle of light.",
    ingredients: ["Pearl Powder", "Mica", "Argan Oil"],
    benefits: ["Lit-from-within glow", "Buildable", "3 shades"],
    tags: ["new"], stock: 50, reviews: [],
  },
  {
    name: "Retinol Renewal Cream", brand: "Glowify", category: "skincare", price: 88, oldPrice: 110,
    rating: 4.9, reviewCount: 367, image: img("photo-1571781926291-c477ebfd024b"),
    description: "Encapsulated retinol with bakuchiol for visible smoothing without irritation.",
    ingredients: ["Retinol 0.3%", "Bakuchiol", "Squalane", "Vitamin E"],
    benefits: ["Smooths wrinkles", "Even tone", "Nightly use"],
    tags: ["bestseller", "sale"], stock: 18, reviews: [],
  },
  {
    name: "Vitamin C Brightening Serum", brand: "Aura Botanique", category: "skincare", price: 64,
    rating: 4.6, reviewCount: 245, image: img("photo-1620916297893-5da3729f8a16"),
    description: "Stabilised 15% L-ascorbic acid for visibly brighter, even skin.",
    ingredients: ["Vitamin C 15%", "Ferulic Acid", "Vitamin E"],
    benefits: ["Brightens", "Antioxidant defence", "Boosts collagen"],
    tags: ["bestseller"], stock: 40, reviews: [],
  },
  {
    name: "Pink Clay Mask", brand: "Veil & Petal", category: "skincare", price: 34,
    rating: 4.5, reviewCount: 198, image: img("photo-1599305020881-1f1e9d6f9c4f"),
    description: "Detoxifying pink clay mask that draws out impurities in 10 minutes.",
    ingredients: ["Pink Clay", "Rosehip", "Aloe Vera"],
    benefits: ["Purifies", "Tightens pores", "Soothes"],
    tags: ["new"], stock: 75, reviews: [],
  },
  {
    name: "Sun Veil SPF 50", brand: "Glowify", category: "skincare", price: 48,
    rating: 4.8, reviewCount: 412, image: img("photo-1556228841-a3c527ebefe5"),
    description: "An invisible, satin-finish daily sunscreen with broad-spectrum SPF 50.",
    ingredients: ["Mineral Filters", "Niacinamide", "Squalane"],
    benefits: ["No white cast", "Daily defence", "Reef-safe"],
    tags: ["bestseller", "new"], stock: 95, reviews: [],
  },
  {
    name: "Eye Renew Cream", brand: "Glowify", category: "skincare", price: 54,
    rating: 4.6, reviewCount: 128, image: img("photo-1631730486572-226d1f595b68", 900),
    description: "Caffeine and peptide cream that depuffs and smooths under-eyes.",
    ingredients: ["Caffeine", "Peptides", "Hyaluronic Acid"],
    benefits: ["Depuffs", "Brightens", "Hydrates"],
    tags: [], stock: 55, reviews: [],
  },
  {
    name: "Cashmere Body Butter", brand: "Aura Botanique", category: "bodycare", price: 46,
    rating: 4.8, reviewCount: 220, image: img("photo-1570194065650-d99fb4bedf0a", 900),
    description: "Whipped shea and rose body butter that melts into 24h softness.",
    ingredients: ["Shea Butter", "Rose Oil", "Almond Oil"],
    benefits: ["24h hydration", "Soft scent", "Vegan"],
    tags: ["bestseller"], stock: 60, reviews: [],
  },
  {
    name: "Bergamot Body Wash", brand: "Lume", category: "bodycare", price: 28,
    rating: 4.5, reviewCount: 86, image: img("photo-1556228453-efd6c1ff04f6"),
    description: "Sulfate-free body wash with bergamot, cedarwood and amber.",
    ingredients: ["Bergamot Oil", "Cedarwood", "Glycerin"],
    benefits: ["Foaming clean", "Skin-softening", "Aromatherapeutic"],
    tags: [], stock: 120, reviews: [],
  },
  {
    name: "Sugar Glow Body Scrub", brand: "Aura Botanique", category: "bodycare", price: 38, oldPrice: 48,
    rating: 4.7, reviewCount: 134, image: img("photo-1556228720-195a672e8a03", 900),
    description: "Brown sugar scrub melts into a nourishing oil for satin-soft skin.",
    ingredients: ["Brown Sugar", "Coconut Oil", "Vitamin E"],
    benefits: ["Polishes", "Hydrates", "Glow-boosting"],
    tags: ["sale"], stock: 70, reviews: [],
  },
  {
    name: "Hand Crème Trio", brand: "Maison Atelier", category: "bodycare", price: 32,
    rating: 4.6, reviewCount: 78, image: img("photo-1599733589046-833caccbbd03", 900),
    description: "Three perfumed hand crèmes in a travel-ready set.",
    ingredients: ["Shea", "Glycerin", "Botanical Extracts"],
    benefits: ["Non-greasy", "Travel size", "Layerable scents"],
    tags: ["new"], stock: 90, reviews: [],
  },
  {
    name: "Silk Repair Conditioner", brand: "Aura Botanique", category: "haircare", price: 38,
    rating: 4.6, reviewCount: 156, image: img("photo-1608248543803-ba4f8c70ae0b", 900),
    description: "Bond-repairing conditioner with silk amino acids for soft, glossy hair.",
    ingredients: ["Silk Amino Acids", "Argan Oil", "Panthenol"],
    benefits: ["Detangles", "Smooths cuticle", "Adds shine"],
    tags: [], stock: 80, reviews: [],
  },
  {
    name: "Volume Bloom Shampoo", brand: "Aura Botanique", category: "haircare", price: 36,
    rating: 4.5, reviewCount: 102, image: img("photo-1626015449731-3a0c2bf2d7f0"),
    description: "Weightless lather that lifts fine hair from the roots.",
    ingredients: ["Biotin", "Bamboo Extract", "Caffeine"],
    benefits: ["Volume", "Gentle daily use", "Color-safe"],
    tags: ["new"], stock: 85, reviews: [],
  },
  {
    name: "Hair Repair Mask", brand: "Glowify", category: "haircare", price: 54,
    rating: 4.8, reviewCount: 198, image: img("photo-1626282874430-c11ae32d2898", 900),
    description: "Deep-conditioning mask that restores bleached and chemically treated hair.",
    ingredients: ["Keratin", "Coconut Oil", "Macadamia Oil"],
    benefits: ["Repairs damage", "Restores softness", "Weekly ritual"],
    tags: ["bestseller"], stock: 35, reviews: [],
  },
  {
    name: "Oud Noir Eau de Parfum", brand: "Noir & Rose", category: "fragrance", price: 145, oldPrice: 180,
    rating: 4.9, reviewCount: 412, image: img("photo-1592945403244-b3fbafd7f539"),
    description: "Smoky oud, leather and saffron — a bold modern oriental.",
    ingredients: ["Oud", "Saffron", "Leather", "Amber"],
    benefits: ["12h wear", "Long-lasting sillage", "Refillable"],
    tags: ["bestseller", "sale", "limited"], stock: 14, reviews: [],
  },
  {
    name: "Jasmine Bloom Body Mist", brand: "Veil & Petal", category: "fragrance", price: 42,
    rating: 4.6, reviewCount: 89, image: img("photo-1547887537-6158d64c35b3"),
    description: "An everyday body mist of jasmine, pear and white musk.",
    ingredients: ["Jasmine Absolute", "Pear Accord", "White Musk"],
    benefits: ["All-over freshness", "Layerable", "Alcohol-free"],
    tags: ["new"], stock: 80, reviews: [],
  },
  {
    name: "Citrus Garden Cologne", brand: "Lume", category: "fragrance", price: 78,
    rating: 4.7, reviewCount: 110, image: img("photo-1541643600914-78b084683601", 900),
    description: "A bright cologne of bergamot, neroli and green tea.",
    ingredients: ["Bergamot", "Neroli", "Green Tea"],
    benefits: ["Unisex", "Daytime fresh", "Vegan"],
    tags: [], stock: 50, reviews: [],
  },
  {
    name: "Rose Gold Beauty Roller", brand: "Lume", category: "tools", price: 58,
    rating: 4.8, reviewCount: 215, image: img("photo-1620916566398-39f1143ab7be", 900),
    description: "Authentic rose quartz roller for de-puffing and lymphatic massage.",
    ingredients: ["Rose Quartz", "Rose-Gold Handle"],
    benefits: ["Reduces puffiness", "Boosts circulation", "Cooling"],
    tags: ["bestseller"], stock: 40, reviews: [],
  },
  {
    name: "Gua Sha Sculpting Stone", brand: "Lume", category: "tools", price: 36,
    rating: 4.6, reviewCount: 178, image: img("photo-1583241800698-9c2e2d0aebc3", 900),
    description: "Heart-shaped jade gua sha for facial sculpting and tension relief.",
    ingredients: ["Real Jade"],
    benefits: ["Lifts & sculpts", "Boosts circulation", "Releases tension"],
    tags: ["new"], stock: 75, reviews: [],
  },
  {
    name: "Pro Makeup Brush Set", brand: "Maison Atelier", category: "tools", price: 96, oldPrice: 130,
    rating: 4.9, reviewCount: 142, image: img("photo-1522335789203-aaa2b1cbab63", 900),
    description: "A 12-piece vegan brush set with rose-gold ferrules and silk synthetic bristles.",
    ingredients: ["Synthetic Silk Bristles", "Aluminum Ferrules"],
    benefits: ["Pro quality", "Vegan", "Travel pouch"],
    tags: ["limited", "sale"], stock: 25, reviews: [],
  },
]);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getRelated = (slug: string, n = 4) => {
  const p = getProduct(slug);
  if (!p) return [];
  return products.filter((x) => x.slug !== slug && x.category === p.category).slice(0, n);
};

// Mock customers
export interface Customer {
  id: string;
  name: string;
  email: string;
  joined: string;
  orders: number;
  spent: number;
  avatar: string;
}

export const customers: Customer[] = [
  { id: "C-001", name: "Layla Ahmed",    email: "layla@example.com",    joined: "2025-09-02", orders: 14, spent: 1820.5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
  { id: "C-002", name: "Noor Khaled",    email: "noor@example.com",     joined: "2025-10-15", orders:  9, spent:  945.0, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" },
  { id: "C-003", name: "Sofia Mansour",  email: "sofia@example.com",    joined: "2025-11-21", orders: 12, spent: 1532.0, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { id: "C-004", name: "Aya Salim",      email: "aya@example.com",      joined: "2026-01-03", orders:  5, spent:  412.0, avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80" },
  { id: "C-005", name: "Mira Halabi",    email: "mira@example.com",     joined: "2026-02-11", orders:  3, spent:  298.0, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" },
  { id: "C-006", name: "Reem Saleh",     email: "reem@example.com",     joined: "2026-03-04", orders:  7, spent:  680.0, avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80" },
  { id: "C-007", name: "Hala Faris",     email: "hala@example.com",     joined: "2026-03-18", orders:  2, spent:  165.0, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
  { id: "C-008", name: "Dana Khoury",    email: "dana@example.com",     joined: "2026-04-02", orders:  6, spent:  742.0, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
];

// Mock orders
export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Refunded";
export interface OrderItem { productId: string; qty: number; price: number; }
export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping: number;
  total: number;
  address: string;
  tracking: { label: string; date: string; done: boolean }[];
}

const pickItems = (ids: number[], qtys: number[]): OrderItem[] =>
  ids.map((i, idx) => ({ productId: products[i].id, qty: qtys[idx], price: products[i].price }));

const sum = (items: OrderItem[], shipping: number) =>
  items.reduce((a, i) => a + i.price * i.qty, 0) + shipping;

const tracking = (state: OrderStatus) => [
  { label: "Order placed",     date: "Mar 28, 10:42 AM", done: true },
  { label: "Payment confirmed", date: "Mar 28, 10:43 AM", done: true },
  { label: "Packed",           date: "Mar 28, 4:20 PM",  done: state !== "Processing" },
  { label: "Shipped",          date: "Mar 29, 8:10 AM",  done: state === "Shipped" || state === "Delivered" },
  { label: "Out for delivery", date: "Mar 30, 9:15 AM",  done: state === "Delivered" },
  { label: "Delivered",        date: "Mar 30, 2:48 PM",  done: state === "Delivered" },
];

export const orders: Order[] = [
  { id: "GLW-10428", customer: "Layla Ahmed",   email: "layla@example.com", date: "Apr 04, 2026", status: "Processing",
    items: pickItems([0, 1], [1, 2]), shipping: 0,
    total: sum(pickItems([0, 1], [1, 2]), 0), address: "Olaya Tower, Riyadh, KSA",
    tracking: tracking("Processing") },
  { id: "GLW-10427", customer: "Noor Khaled",   email: "noor@example.com",  date: "Apr 03, 2026", status: "Shipped",
    items: pickItems([2], [1]), shipping: 8,
    total: sum(pickItems([2], [1]), 8), address: "Dubai Marina, UAE",
    tracking: tracking("Shipped") },
  { id: "GLW-10426", customer: "Sofia Mansour", email: "sofia@example.com", date: "Apr 02, 2026", status: "Delivered",
    items: pickItems([3, 4, 5], [1, 1, 1]), shipping: 0,
    total: sum(pickItems([3, 4, 5], [1, 1, 1]), 0), address: "Hamra, Beirut, Lebanon",
    tracking: tracking("Delivered") },
  { id: "GLW-10425", customer: "Aya Salim",     email: "aya@example.com",   date: "Apr 01, 2026", status: "Delivered",
    items: pickItems([7], [1]), shipping: 8,
    total: sum(pickItems([7], [1]), 8), address: "Amman, Jordan",
    tracking: tracking("Delivered") },
  { id: "GLW-10424", customer: "Mira Halabi",   email: "mira@example.com",  date: "Mar 30, 2026", status: "Refunded",
    items: pickItems([6], [1]), shipping: 0,
    total: sum(pickItems([6], [1]), 0), address: "Jeddah, KSA",
    tracking: tracking("Delivered") },
  { id: "GLW-10421", customer: "Layla Ahmed",   email: "layla@example.com", date: "Mar 28, 2026", status: "Delivered",
    items: pickItems([0, 1], [1, 1]), shipping: 0,
    total: sum(pickItems([0, 1], [1, 1]), 0), address: "Olaya Tower, Riyadh, KSA",
    tracking: tracking("Delivered") },
  { id: "GLW-10387", customer: "Noor Khaled",   email: "noor@example.com",  date: "Mar 14, 2026", status: "Delivered",
    items: pickItems([12, 13], [1, 1]), shipping: 8,
    total: sum(pickItems([12, 13], [1, 1]), 8), address: "Dubai Marina, UAE",
    tracking: tracking("Delivered") },
  { id: "GLW-10342", customer: "Sofia Mansour", email: "sofia@example.com", date: "Feb 22, 2026", status: "Delivered",
    items: pickItems([14, 15, 16], [1, 1, 1]), shipping: 0,
    total: sum(pickItems([14, 15, 16], [1, 1, 1]), 0), address: "Hamra, Beirut, Lebanon",
    tracking: tracking("Delivered") },
];

export const getOrder = (id: string) => orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
