export interface Product {
  id: string; // "p1"
  name: string; // "iPhone 13"
  description: string; // "Apple smartphone..."
  category: string; // "Electronics"
  imageUrl: string; // "https://..." (لاحظ إنها مفرد مش مصفوفة)
  price: number; // 26000
  oldPrice: number; // 28999
  newPrice: number; // 26000
  stock: number; // 131
  rating: number; // 4.8
  reviewsCount: number; // 156
}

// ونعمل نوع مخصص للإدخال (لما تيجي تعمل منتج جديد)
// بنشيل منه الـ id لأننا بنكريته، وبنشيل التقييمات لأنها لسه بتبدأ صفر
export type ProductInput = Omit<Product, "id" | "rating" | "reviewsCount">;
