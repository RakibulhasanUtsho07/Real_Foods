export interface BakeryProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string | Date;
  expiryDate?: string;
  category?: string;
  isEggless?: boolean;
}