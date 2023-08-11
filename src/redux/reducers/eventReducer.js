import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventInfo: null,
  loading: false,
  error: false,
};

const eventReducer = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventStart: (state) => {
      state.loading = true;
    },
    setEventSuccess: (state, action) => {
      state.loading = false;
      state.eventInfo = action.payload;
    },
    setEventError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // events shop reducers
    setEventsShopStart: (state) => {
      state.loading = true;
    },
    setEventsShopSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },
    setEventsShopError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // events reducers
    setEventsStart: (state) => {
      state.loading = true;
    },
    setEventsSuccess: (state, action) => {
      state.loading = false;
      state.allEvents = action.payload;
    },
    setEventsError: (state) => {
      state.loading = false;
      state.error = true;
    },

    // delete event
    setDeleteEventStart: (state) => {
      state.loading = true;
    },
    setDeleteEventSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    setDeleteEventError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setEventStart,
  setEventSuccess,
  setEventError,
  setEventsShopStart,
  setEventsShopError,
  setEventsShopSuccess,
  setEventsStart,
  setEventsError,
  setEventsSuccess,
  setDeleteEventError,
  setDeleteEventStart,
  setDeleteEventSuccess,
} = eventReducer.actions;

export default eventReducer.reducer;
