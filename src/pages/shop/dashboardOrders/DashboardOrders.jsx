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
import { getOrdersShop } from "../../../redux/actions/order";
import { BsArrowRight } from "react-icons/bs";

const DashboardOrders = () => {
  const dispatch = useDispatch();
  const { shopInfo } = useSelector((state) => state.shop);
  const { ordersShop, loading } = useSelector((state) => state.order);

  useEffect(() => {
    getOrdersShop(shopInfo._id, dispatch);
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "text-green-500"
          : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      minWidth: 130,
      flex: 0.7,
      type: "number",
    },
    {
      field: "total",
      headerName: "Total",
      minWidth: 130,
      flex: 0.7,
      type: "number",
    },
    {
      field: "",
      headerName: "Actions",
      minWidth: 130,
      flex: 0.7,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/shop/order/${params.id}`}
            className="py-[3px] px-[15px] text-white bg-black rounded"
          >
            <BsArrowRight size={20} />
          </Link>
        );
      },
    },
  ];

  const rows = [];
  ordersShop &&
  ordersShop.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        total: item.totalPrice,
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

export default DashboardOrders;
