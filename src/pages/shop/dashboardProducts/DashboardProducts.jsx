import React, { useEffect } from "react";
import DashboardHeader from "../../../components/shopCom/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../../components/shopCom/dashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../redux/actions/product";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../../components/loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import {
  setDeleteProductError,
  setDeleteProductStart,
  setDeleteProductSuccess,
} from "../../../redux/reducers/productReducer";
import apiAxios from "../../../utils/apiAxios";

const DashboardProducts = () => {
  const dispatch = useDispatch();
  const { shopInfo } = useSelector((state) => state.shop);
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    getAllProductsShop(shopInfo._id, dispatch);
  }, []);

  const columns = [
    { field: "id", headerName: "Product Id", flex: 0.6, width: 120 },
    { field: "name", headerName: "Name", flex: 0.5, width: 90 },
    {
      field: "originalPrice",
      headerName: "price",
      flex: 0.6,
      type: "number",
      width: 90,
    },
    {
      field: "productStock",
      headerName: "Stock",
      flex: 0.6,
      type: "number",
      width: 90,
    },
    { field: "category", headerName: "Category", flex: 0.5, width: 90 },
    {
      field: "",
      headerName: "Actions",
      width: 90,
      flex: 0.6,
      renderCell: (params) => {
        const d = params.row.name;
        const productName = d.replace(/\s+/g, "-");

        return (
          <div className="flex items-center gap-3">
            <Link to={`/products/${productName}`}>
              <GrView size={20} />
            </Link>
            <button onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        originalPrice: item.originalPrice,
        productStock: item.productStock,
        category: item.category,
      });
    });

  const handleDelete = async (id) => {
    dispatch(setDeleteProductStart());
    try {
      const { data } = await apiAxios.delete(
        `/products/deleteProductShop/${id}`
      );
      dispatch(setDeleteProductSuccess(data.message));
      getAllProductsShop(shopInfo._id, dispatch);
    } catch (error) {
      dispatch(setDeleteProductError());
      console.log(error);
    }
  };

  return (
    <div>
      <DashboardHeader />
      <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
        <div className="w-[60px] md:w-[20%] bg-white shadow">
          <DashboardSidebar />
        </div>
        <div className="w-full md:w-[85%] mt-[30px] mx-[10px]">
          <div>
            {loading ? (
              <Loader />
            ) : (
              <div className="bg-white">
                <DataGrid rows={rows} columns={columns} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProducts;
