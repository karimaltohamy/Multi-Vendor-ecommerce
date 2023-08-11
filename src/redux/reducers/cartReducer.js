import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((ele) => ele._id === item._id);

      if (isItemExist) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            state.cart.map((ele) => (ele._id === isItemExist._id ? item : ele))
          )
        );
        return {
          ...state,
          cart: state.cart.map((ele) =>
            ele._id === isItemExist._id ? item : ele
          ),
        };
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...state.cart, item])
        );
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },
    removeItemFromCart: (state, action) => {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.filter((ele) => ele._id !== action.payload))
      );
      return {
        ...state,
        cart: state.cart.filter((ele) => ele._id !== action.payload),
      };
    },
  },
});

export const { removeItemFromCart, addItemToCart } = cartReducer.actions;

export default cartReducer.reducer;
