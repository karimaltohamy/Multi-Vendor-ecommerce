import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import shopReducer from "./reducers/shopReducer";
import productReducer from "./reducers/productReducer";
import eventReducer from "./reducers/eventReducer";
import cartReducer from "./reducers/cartReducer";
import wishlistReducer from "./reducers/wishlistReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    event: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
