import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsInfo: null,
  loading: false,
  error: false,
};

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductStart: (state) => {
      state.loading = true;
    },
    setProductSuccess: (state, action) => {
      state.loading = false;
      state.productInfo = action.payload;
    },
    setProductError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // products shop reducers
    setProductsShopStart: (state) => {
      state.loading = true;
    },
    setProductsShopSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    setProductsShopError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // all products reducers
    setProductsStart: (state) => {
      state.loading = true;
    },
    setProductsSuccess: (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    },
    setProductsError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // delete product
    setDeleteProductStart: (state) => {
      state.loading = true;
    },
    setDeleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    setDeleteProductError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setProductStart,
  setProductSuccess,
  setProductError,
  setProductsShopStart,
  setProductsShopError,
  setProductsShopSuccess,
  setProductsStart,
  setProductsError,
  setProductsSuccess,
  setDeleteProductError,
  setDeleteProductStart,
  setDeleteProductSuccess,
} = productReducer.actions;

export default productReducer.reducer;
