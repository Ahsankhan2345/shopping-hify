import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USD_TO_PKR = 280; 


export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      
      return response.data.map((item) => ({
        _id: item.id.toString(),
        name: item.title,
        price: Math.round(item.price * USD_TO_PKR),
        description: item.description,
        imageUrl: item.image,
        category: formatCategory(item.category), // Normalized for your UI
        rating: item.rating?.rate || 4.5,
        stock: Math.floor(Math.random() * 50) + 1, // Simulated stock for AI logic
        createdAt: new Date().toISOString(),
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || "Neural Link Failure");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      const item = response.data;
      return {
        _id: item.id.toString(),
        name: item.title,
        price: Math.round(item.price * USD_TO_PKR),
        description: item.description,
        imageUrl: item.image,
        category: formatCategory(item.category),
        rating: item.rating?.rate || 4.8,
        features: ["AI Optimized", "Premium Build", "Quantum Shielded"], 
      };
    } catch (error) {
      return rejectWithValue("Product Module Not Found");
    }
  }
);

const formatCategory = (cat) => {
  if (cat.includes("electronics")) return "Tech";
  if (cat.includes("clothing")) return "Fashion";
  if (cat.includes("jewelery")) return "Wellness";
  return "Home";
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    filteredProducts: [], 
    selectedProduct: null,
    loading: false,
    error: null,
    lastSync: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    filterBySearch: (state, action) => {
      const term = action.payload.toLowerCase();
      state.filteredProducts = state.allProducts.filter(p => 
        p.name.toLowerCase().includes(term)
      );
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
        state.loading = false;
        state.lastSync = new Date().toISOString();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct, filterBySearch } = productSlice.actions;
export default productSlice.reducer;