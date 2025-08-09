import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USD_TO_PKR = 280; // conversion rate

// Fetch all products from FakeStore API
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data.map((item) => ({
      _id: item.id.toString(),
      name: item.title,
      price: Math.round(item.price * USD_TO_PKR), // convert USD → PKR
      description: item.description,
      imageUrl: item.image,
    }));
  }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const item = response.data;
    return {
      _id: item.id.toString(),
      name: item.title,
      price: Math.round(item.price * USD_TO_PKR), // convert USD → PKR
      description: item.description,
      imageUrl: item.image,
    };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
