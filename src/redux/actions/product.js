import apiAxios from "../../utils/apiAxios";
import {
  setProductsShopError,
  setProductsShopStart,
  setProductsShopSuccess,
  setProductsError,
  setProductsStart,
  setProductsSuccess,
  setProductStart,
  setProductSuccess,
  setProductError,
} from "../reducers/productReducer";

export const getAllProductsShop = async (id, dispatch) => {
  dispatch(setProductsShopStart());
  try {
    const { data } = await apiAxios.get(`/products/all-products-shop/${id}`);
    dispatch(setProductsShopSuccess(data.products));
  } catch (error) {
    dispatch(setProductsShopError());
    console.log(error);
  }
};

export const getAllProducts = async (dispatch) => {
  dispatch(setProductsStart());
  try {
    const { data } = await apiAxios.get(`/products/all-products`);
    dispatch(setProductsSuccess(data.allProducts));
  } catch (error) {
    dispatch(setProductsError());
    console.log(error);
  }
};

export const getSingleProduct = async (id, dispatch) => {
  dispatch(setProductStart());
  try {
    const { data } = await apiAxios.get(`/products/${id}`);
    dispatch(setProductSuccess(data.product));
  } catch (error) {
    dispatch(setProductError());
    console.log(error);
  }
};
