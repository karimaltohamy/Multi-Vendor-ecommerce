import apiAxios from "../../utils/apiAxios";
import {
  setOrderShopStart,
  setOrderUserStart,
  setOrdersShopError,
  setOrdersShopSuccess,
  setOrdersUserError,
  setOrdersUserSuccess,
} from "../reducers/orderReducer";

export const getOrdersUser = async (id, dispatch) => {
  dispatch(setOrderUserStart());
  try {
    const { data } = await apiAxios.get(`/orders/orders-user/${id}`);
    dispatch(setOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(setOrdersUserError());
    console.log(error); 
  }
};

export const getOrdersShop = async (id, dispatch) => {
  dispatch(setOrderShopStart());
  try {
    const { data } = await apiAxios.get(`/orders/orders-shop/${id}`);
    dispatch(setOrdersShopSuccess(data.orders));
  } catch (error) {
    dispatch(setOrdersShopError());
    console.log(error);
  }
};
