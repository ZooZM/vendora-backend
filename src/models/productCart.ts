export interface ProductCart {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
export type ProductInput = Omit<
  ProductCart,
  "id" | "createdAt" | "updatedAt" | "rating" | "reviewsCount"
>;
