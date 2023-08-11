import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserStart: (state) => {
      state.loading = true;
    },
    setUserSeccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUserError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // update user
    setUpdateUserStart: (state) => {
      state.loading = true;
    },
    setUpdateUserSeccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUpdateUserError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // update user
    setUpdateAddressUserStart: (state) => {
      state.loadingAddress = true;
    },
    setUpdateAddressUserSeccess: (state, action) => {
      state.loadingAddress = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setUpdateAddressUserError: (state) => {
      state.loadingAddress = false;
      state.error = true;
    },

    // change password user
    setChangePasswordUserStart: (state) => {
      state.loadingChange = true;
    },
    setChangePasswordUserSeccess: (state, action) => {
      state.loadingChange = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setChangePasswordUserError: (state) => {
      state.loadingChange = false;
      state.error = true;
    },

    setLogout: (state, action) => {
      state.userInfo = null;
      localStorage.setItem("user", null);
    },
  },
});

export const {
  setUserStart,
  setUserSeccess,
  setUserError,
  setLogout,
  setUpdateUserStart,
  setUpdateUserSeccess,
  setUpdateUserError,
  setUpdateAddressUserStart,
  setUpdateAddressUserSeccess,
  setUpdateAddressUserError,
  setChangePasswordUserStart,
  setChangePasswordUserSeccess,
  setChangePasswordUserError,

} = userReducer.actions;
export default userReducer.reducer;
