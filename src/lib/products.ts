export type Category = "skincare" | "makeup" | "haircare" | "fragrance";

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

export const products: Product[] = [
  {
    id: "p1",
    slug: "hydra-satin-dew-serum",
    name: "Hydra-Satin Dew Serum",
    category: "skincare",
    price: 68,
    oldPrice: 82,
    rating: 4.8,
    reviewCount: 412,
    image: img("photo-1556228720-195a672e8a03"),
    gallery: [
      img("photo-1556228720-195a672e8a03"),
      img("photo-1570194065650-d99fb4bedf0a"),
      img("photo-1611080626919-7cf5a9dbab5b"),
    ],
    description:
      "A weightless hyaluronic serum infused with botanical peptides for an immediate, satin-finish glow.",
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Centella Asiatica", "Rose Hip Oil"],
    benefits: ["Plumps fine lines", "72h hydration", "Restores luminosity"],
    tags: ["bestseller", "sale"],
    stock: 24,
    reviews: [
      { author: "Layla", rating: 5, text: "My skin has never looked this dewy.", date: "2024-08-14" },
      { author: "Noor", rating: 5, text: "Absolute holy grail.", date: "2024-07-02" },
      { author: "Sofia", rating: 4, text: "Lovely texture, takes time to absorb.", date: "2024-06-21" },
    ],
  },
  {
    id: "p2",
    slug: "petal-tint-lip-balm",
    name: "Petal Tint Lip Balm",
    category: "makeup",
    price: 32,
    rating: 4.7,
    reviewCount: 289,
    image: img("photo-1586495777744-4413f21062fa"),
    gallery: [img("photo-1586495777744-4413f21062fa"), img("photo-1599733589046-833caccbbd03")],
    description: "A sheer, buildable rose tint with a satin-balm finish that melts into lips.",
    ingredients: ["Shea Butter", "Beetroot Extract", "Vitamin E"],
    benefits: ["Sheer flush of color", "Hydrating", "Cruelty-free"],
    tags: ["bestseller", "new"],
    stock: 58,
    reviews: [{ author: "Aya", rating: 5, text: "The most flattering rose ever.", date: "2024-08-01" }],
  },
  {
    id: "p3",
    slug: "velvet-veil-powder",
    name: "Velvet Veil Setting Powder",
    category: "makeup",
    price: 45,
    rating: 4.6,
    reviewCount: 173,
    image: img("photo-1631730486572-226d1f595b68"),
    gallery: [img("photo-1631730486572-226d1f595b68")],
    description: "Featherlight powder that blurs pores and locks makeup for hours.",
    ingredients: ["Silica", "Rice Powder", "Vitamin E"],
    benefits: ["Soft-focus finish", "12h wear", "Translucent"],
    tags: ["new"],
    stock: 41,
    reviews: [],
  },
  {
    id: "p4",
    slug: "ritual-set-essentials",
    name: "The Ritual Set",
    category: "skincare",
    price: 120,
    oldPrice: 165,
    rating: 4.9,
    reviewCount: 521,
    image: img("photo-1570194065650-d99fb4bedf0a"),
    gallery: [img("photo-1570194065650-d99fb4bedf0a"), img("photo-1612817288484-6f916006741a")],
    description: "Three award-winning essentials for your morning ceremony.",
    ingredients: ["Includes cleanser, serum, moisturizer"],
    benefits: ["Complete routine", "Save 27%", "Travel friendly"],
    tags: ["bestseller", "limited", "sale"],
    stock: 12,
    reviews: [],
  },
  {
    id: "p5",
    slug: "golden-glow-hair-oil",
    name: "Golden Glow Hair Oil",
    category: "haircare",
    price: 72,
    rating: 4.8,
    reviewCount: 305,
    image: img("photo-1626282874430-c11ae32d2898"),
    gallery: [img("photo-1626282874430-c11ae32d2898")],
    description: "Argan and camellia oils restore shine and tame frizz without weight.",
    ingredients: ["Argan Oil", "Camellia Oil", "Vitamin E"],
    benefits: ["Mirror shine", "Heat protection", "Frizz control"],
    tags: ["bestseller"],
    stock: 30,
    reviews: [],
  },
  {
    id: "p6",
    slug: "cloud-milk-cleanser",
    name: "Cloud Milk Cleanser",
    category: "skincare",
    price: 42,
    rating: 4.7,
    reviewCount: 218,
    image: img("photo-1620916566398-39f1143ab7be"),
    gallery: [img("photo-1620916566398-39f1143ab7be")],
    description: "Whipped milk cleanser that dissolves makeup while replenishing the moisture barrier.",
    ingredients: ["Oat Milk", "Glycerin", "Squalane"],
    benefits: ["Gentle", "pH balanced", "Daily use"],
    tags: ["new"],
    stock: 80,
    reviews: [],
  },
  {
    id: "p7",
    slug: "rose-mist-fragrance",
    name: "Rose Mist Eau de Parfum",
    category: "fragrance",
    price: 95,
    rating: 4.9,
    reviewCount: 142,
    image: img("photo-1541643600914-78b084683601"),
    gallery: [img("photo-1541643600914-78b084683601")],
    description: "Damask rose layered with white musk and a soft amber base.",
    ingredients: ["Damask Rose", "White Musk", "Amber"],
    benefits: ["8h wear", "Vegan", "Recyclable bottle"],
    tags: ["bestseller", "limited"],
    stock: 18,
    reviews: [],
  },
  {
    id: "p8",
    slug: "contour-creme-balm",
    name: "Contour Crème Balm",
    category: "makeup",
    price: 64,
    rating: 4.6,
    reviewCount: 96,
    image: img("photo-1599948128020-9a44505b58d4"),
    gallery: [img("photo-1599948128020-9a44505b58d4")],
    description: "Buildable cream balm that sculpts with a soft-focus matte finish.",
    ingredients: ["Mineral Pigments", "Jojoba", "Vitamin E"],
    benefits: ["Blends seamlessly", "All-day wear", "3 shades"],
    tags: ["new"],
    stock: 45,
    reviews: [],
  },
  {
    id: "p9",
    slug: "silk-night-mask",
    name: "Silk Overnight Mask",
    category: "skincare",
    price: 58,
    rating: 4.8,
    reviewCount: 263,
    image: img("photo-1612817288484-6f916006741a"),
    gallery: [img("photo-1612817288484-6f916006741a")],
    description: "A leave-on mask that resurfaces and softens overnight.",
    ingredients: ["AHA Complex", "Squalane", "Centella"],
    benefits: ["Smooths texture", "Wake up glowing", "Non-greasy"],
    tags: ["bestseller"],
    stock: 26,
    reviews: [],
  },
  {
    id: "p10",
    slug: "feather-mascara",
    name: "Featherlight Mascara",
    category: "makeup",
    price: 28,
    rating: 4.5,
    reviewCount: 410,
    image: img("photo-1631214540242-6fa6ddcef687"),
    gallery: [img("photo-1631214540242-6fa6ddcef687")],
    description: "Lengthens without clumps, removes with warm water.",
    ingredients: ["Bamboo Fiber", "Beeswax"],
    benefits: ["Lengthening", "Tubing formula", "Smudge-proof"],
    tags: ["new"],
    stock: 90,
    reviews: [],
  },
  {
    id: "p11",
    slug: "scalp-renew-tonic",
    name: "Scalp Renew Tonic",
    category: "haircare",
    price: 52,
    rating: 4.7,
    reviewCount: 132,
    image: img("photo-1608248543803-ba4f8c70ae0b"),
    gallery: [img("photo-1608248543803-ba4f8c70ae0b")],
    description: "Caffeine-infused tonic that revitalizes the scalp and supports density.",
    ingredients: ["Caffeine", "Biotin", "Peptides"],
    benefits: ["Stimulates roots", "Refreshes scalp", "Daily use"],
    tags: [],
    stock: 60,
    reviews: [],
  },
  {
    id: "p12",
    slug: "satin-blush-cream",
    name: "Satin Blush Cream",
    category: "makeup",
    price: 36,
    rating: 4.6,
    reviewCount: 78,
    image: img("photo-1583241800698-9c2e2d0aebc3"),
    gallery: [img("photo-1583241800698-9c2e2d0aebc3")],
    description: "A cushion-soft cream blush that diffuses into a healthy flush.",
    ingredients: ["Squalane", "Jojoba", "Mineral Pigments"],
    benefits: ["Dewy finish", "Buildable", "4 shades"],
    tags: ["new"],
    stock: 70,
    reviews: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getRelated = (slug: string, n = 4) => {
  const p = getProduct(slug);
  if (!p) return [];
  return products.filter((x) => x.slug !== slug && x.category === p.category).slice(0, n);
};

export const categories: { key: Category; label: string }[] = [
  { key: "skincare", label: "Skincare" },
  { key: "makeup", label: "Makeup" },
  { key: "haircare", label: "Haircare" },
  { key: "fragrance", label: "Fragrance" },
];
