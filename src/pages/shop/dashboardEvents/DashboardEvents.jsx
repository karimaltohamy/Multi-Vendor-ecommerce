import React, { useEffect } from "react";
import DashboardHeader from "../../../components/shopCom/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../../components/shopCom/dashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../../components/loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import apiAxios from "../../../utils/apiAxios";
import { getAllEventsShop } from "../../../redux/actions/events";
import {
  setDeleteEventError,
  setDeleteEventStart,
  setDeleteEventSuccess,
} from "../../../redux/reducers/eventReducer";

const DashboardEvents = () => {
  const dispatch = useDispatch();
  const { shopInfo } = useSelector((state) => state.shop);
  const { events, loading } = useSelector((state) => state.event);

  useEffect(() => {
    getAllEventsShop(shopInfo._id, dispatch);
    console.log();
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
  events &&
    events.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        originalPrice: item.originalPrice,
        productStock: item.productStock,
        category: item.category,
      });
    });

  const handleDelete = async (id) => {
    dispatch(setDeleteEventStart());
    try {
      const { data } = await apiAxios.delete(
        `/events/deleteEventShop/${id}`,
        {}
      );
      dispatch(setDeleteEventSuccess(data.message));
      getAllEventsShop(shopInfo._id, dispatch);
    } catch (error) {
      dispatch(setDeleteEventError());
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

export default DashboardEvents;
