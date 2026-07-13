export const allFoods = async () => {
  try {
    
    const res = await fetch(`http://localhost:5000/api/admin/foods`, {
      cache: 'no-store'
    });

    
    if (!res.ok) {
      throw new Error(`Failed to fetch food items: ${res.statusText}`);
    }

    const data = await res.json();
    
   
    return { success: true, data: data.data || data };

  } catch (error: any) {
    console.error("Error in allFoods server action:", error);
    return { 
      success: false, 
      error: error.message || "Failed to load bakery inventory 🥖" 
    };
  }
};