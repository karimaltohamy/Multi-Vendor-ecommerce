import apiAxios from "../../utils/apiAxios";
import {
  setEventsShopError,
  setEventsShopStart,
  setEventsShopSuccess,
  setEventsError,
  setEventsStart,
  setEventsSuccess,
} from "../reducers/eventReducer";

export const getAllEventsShop = async (id, dispatch) => {
  dispatch(setEventsShopStart());
  try {
    const { data } = await apiAxios.get(`/events/all-events-shop/${id}`);
    dispatch(setEventsShopSuccess(data.events));
  } catch (error) {
    dispatch(setEventsShopError());
    console.log(error);
  }
};

export const getAllEvents = async (dispatch) => {
  dispatch(setEventsStart());
  try {
    const { data } = await apiAxios.get(`/events/all-events`);
    dispatch(setEventsSuccess(data.events));
  } catch (error) {
    dispatch(setEventsError());
    console.log(error);
  }
};
