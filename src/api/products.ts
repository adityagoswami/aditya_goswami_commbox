export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  rating: number;
  images: string[];
}

const API_URL = 'https://dummyjson.com/products';

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}?limit=100`);
    
    if (!response.ok) {
      throw new Error('Could not get products');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Product not found');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Detail Fetch Error:", error);
    throw error;
  }
};