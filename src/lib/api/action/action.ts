"use server"

export const addProducts = async (productData: any) => {
  try {
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    // রিকোয়েস্ট সফল না হলে এরর থ্রো করবে
    if (!res.ok) {
      throw new Error(`Failed to post product: ${res.statusText}`);
    }

    const data = await res.json();
    return { success: true, data };

  } catch (error: any) {
    console.error("Error in addProducts server action:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
}

export const editProducts = async (id: string, productData: any) => {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    // Check if the server response is successful
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
    const res = await fetch(`http://localhost:5000/api/product/${id}`, {
      // Optional but recommended for server actions fetching single items:
      cache: 'no-store'
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
interface OrderPayload {
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
}

export const placeOrder = async (payload: OrderPayload) => {
  try {
    const res = await fetch(`http://localhost:5000/api/product/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
interface CartPayload {
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
}

export const addToCartAction = async (payload: CartPayload) => {
  try {
    const res = await fetch(`http://localhost:5000/api/product/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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