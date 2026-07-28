"use server"

import { BakeryProduct } from "@/app/dashboard/user/foods/page";
import { authHeader } from "@/lib/core/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const getValidHeader = async () => {
  const headers = await authHeader();

  if (!headers.authorization || headers.authorization.includes("undefined")) {
    console.warn(
      "⚠️ Warning: Authorization token is undefined in Server Action!",
    );
  }
  return headers;
};
// ---------- Shared types ----------
interface ProductPayload {
  productId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  total: number;
}

interface UserPayload {
  userId: string | null;
  name: string | null;
  email: string | null;
}

interface OrderPayload {
  product: ProductPayload;
  user: UserPayload;
}

interface CartPayload {
  product: ProductPayload;
  user: UserPayload;
}

// ---------- Products ----------
export const addProducts = async (productData: any) => {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         ...(await getValidHeader()),
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error(`Failed to post product: ${res.statusText}`);
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error: any) {
    console.error("Error in addProducts server action:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
};

export const editProducts = async (id: string, productData: any) => {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
         ...(await getValidHeader()),
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update product: ${res.statusText}`);
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error: any) {
    console.error("Error in editProducts server action:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
};

export const specificProduct = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/product/${id}`, {
      cache: 'no-store',
      headers: await getValidHeader()
         
      
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error: any) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return { success: false, error: error.message || "Something went wrong" };
  }
};

export async function getProductById(id: string): Promise<BakeryProduct | null> {
  try {
    const res = await fetch(`${API_URL}/api/product/${id}`, {
      cache: 'no-store',
       headers: await getValidHeader()
    });

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !json.data) return null;

    return json.data as BakeryProduct;
  } catch (error) {
    console.error('Error fetching dynamic bakery asset:', error);
    return null;
  }
}

// ---------- Orders ----------
export const placeOrder = async (payload: OrderPayload) => {
  try {
    const res = await fetch(`${API_URL}/api/product/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         ...(await getValidHeader()),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error || `Order failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error placing order:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
};

// ---------- Cart ----------
export const addToCartAction = async (payload: CartPayload) => {
  try {
    const res = await fetch(`${API_URL}/api/product/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         ...(await getValidHeader()),

      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error || `Add to cart failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
};

export const getCartItems = async (userId: string) => {
  try {
    // Fetches full cart items (not the /count endpoint) — consuming code
    // in the navbar sums `product.quantity` across `data`, which needs the array shape.
    const res = await fetch(`${API_URL}/api/product/cart?userId=${userId}`, {
      cache: 'no-store',
       headers: await getValidHeader()
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.error || `Fetching cart failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching cart items:', error);
    return { success: false, error: error.message || 'Something went wrong', data: [] };
  }
};