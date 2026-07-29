export interface OrderedProduct {
  _id: string;
  product: {
    productId: string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
    total: number;
  };
  user: {
    userId: string | null;
    name: string | null;
    email: string | null;
  };
  status: 'Pending' | 'Baking' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}