import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersUser: [],
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderUserStart: (state) => {
      state.loading = true;
    },
    setOrdersUserSuccess: (state, action) => {
      state.loading = false;
      state.ordersUser = action.payload;
    },
    setOrdersUserError: (state) => {
      state.loading = false;
      state.error = true;
    },
    //   orders shop
    setOrderShopStart: (state) => {
      state.loading = true;
    },
    setOrdersShopSuccess: (state, action) => {
      state.loading = false;
      state.ordersShop = action.payload;
    },
    setOrdersShopError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setOrderUserStart,
  setOrdersUserSuccess,
  setOrdersUserError,
  setOrderShopStart,
  setOrdersShopSuccess,
  setOrdersShopError,
} = orderReducer.actions;

export default orderReducer.reducer;
