import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopInfo: JSON.parse(localStorage.getItem("seller")) || null,
  loading: false,
  error: false,
};

const ShopReducer = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShopStart: (state) => {
      state.loading = true;
    },
    setShopSuccess: (state, action) => {
      state.loading = false;
      state.shopInfo = action.payload;
      localStorage.setItem("seller", JSON.stringify(action.payload));
    },
    setShopError: (state) => {
      state.loading = false;
      state.error = true;
    },
    setLogoutShop: (state, action) => {
      state.shopInfo = null;
      localStorage.setItem("seller", null);
    },
  },
});

export const { setShopStart, setShopSuccess, setShopError, setLogoutShop } =
  ShopReducer.actions;

export default ShopReducer.reducer;
