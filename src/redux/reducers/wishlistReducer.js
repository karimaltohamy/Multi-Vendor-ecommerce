import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

const wishlistReducer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((ele) => ele._id === item._id);

      if (isItemExist) {
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(
            state.wishlist.map((ele) =>
              ele._id === isItemExist._id ? item : ele
            )
          )
        );
        return {
          ...state,
          wishlist: state.wishlist.map((ele) =>
            ele._id === isItemExist._id ? item : ele
          ),
        };
      } else {
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify([...state.wishlist, item])
        );
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },
    removeItemFromWishlist: (state, action) => {
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(
          state.wishlist.filter((ele) => ele._id !== action.payload)
        )
      );
      return {
        ...state,
        wishlist: state.wishlist.filter((ele) => ele._id !== action.payload),
      };
    },
  },
});

export const { removeItemFromWishlist, addItemToWishlist } =
  wishlistReducer.actions;

export default wishlistReducer.reducer;
