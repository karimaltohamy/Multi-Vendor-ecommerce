import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../components/shopCom/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../../components/shopCom/dashboardSidebar/DashboardSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import Loader from "../../../components/loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import apiAxios from "../../../utils/apiAxios";
import { getAllEventsShop } from "../../../redux/actions/events";
import {
  setDeleteEventError,
  setDeleteEventStart,
  setDeleteEventSuccess,
} from "../../../redux/reducers/eventReducer";
import { getAllProductsShop } from "../../../redux/actions/product";
import { toast } from "react-toastify";

const DashboardCoupons = () => {
  const dispatch = useDispatch();
  const { shopInfo } = useSelector((state) => state.shop);
  const [couponsCodes, setCouponCodes] = useState([]);
  const { products } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    value: null,
    minAmount: null,
    maxAmount: null,
    selectedProduct: null,
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const getAllCouponCodes = async () => {
    setLoading(true);
    try {
      const { data } = await apiAxios.get(
        `/couponCodes/all-couponCodes/${shopInfo._id}`
      );
      setCouponCodes(data.couponCodes);
      setLoading(false);
    } catch (error) {
      toast.error(error);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProductsShop(shopInfo._id, dispatch);
    getAllCouponCodes();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.6, width: 120 },
    { field: "name", headerName: "Name", flex: 0.5, width: 90 },
    {
      field: "value",
      headerName: "  Discount Percentenge",
      flex: 0.6,
      type: "number",
      width: 90,
    },
    {
      field: "minAmount",
      headerName: "Min Amount",
      flex: 0.6,
      type: "number",
      width: 90,
    },
    { field: "maxAmount", headerName: "Max Amount", flex: 0.5, width: 90 },
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
            <button onClick={() => handleDelete(params.row.id)}>
              <AiOutlineDelete size={20} />
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];
  couponsCodes &&
    couponsCodes.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        value: item.value,
        minAmount: item.minAmount,
        maxAmount: item.maxAmount,
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

  const handleCreateCouponCode = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await apiAxios.post(
        "/couponCodes/create-couponCode",
        {
          ...inputs,
          shop: shopInfo._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success("success create Coupon Code");
      setOpenPopup(false);
      getAllCouponCodes();
    } catch (error) {
      toast.error(error);
      console.log(error);
      setLoading(false);
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
                <div className="p-3">
                  <button
                    className="py-2 px-3 text-[13px] text-white bg-black rounded"
                    onClick={() => setOpenPopup(true)}
                  >
                    Create Coupon Code
                  </button>
                </div>
                <DataGrid rows={rows} columns={columns} />
                {openPopup && (
                  <div className="fixed top-0 left-0 w-full h-full bg-[#000000ad] z-50 flex items-center justify-center ">
                    <div className="h-[80vh] w-[50%] bg-white p-4 rounded relative">
                      <span
                        className="top-3 right-3 absolute cursor-pointer"
                        onClick={() => setOpenPopup(false)}
                      >
                        <AiOutlineClose size={25} />
                      </span>
                      <h3 className="text-[23px] font-semibold text-center mt-4">
                        {" "}
                        Create Coupon Code
                      </h3>
                      <form
                        className="mt-[40px]"
                        onSubmit={handleCreateCouponCode}
                      >
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="block text-gray-700 font-semibold mb-2"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                            id="name"
                            placeholder="enter your couponCode name..."
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="block text-gray-700 font-semibold mb-2"
                          >
                            Discount Percentenge
                          </label>
                          <input
                            type="number"
                            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                            id="value"
                            placeholder="enter your couponCode value..."
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="block text-gray-700 font-semibold mb-2"
                          >
                            minAmount
                          </label>
                          <input
                            type="number"
                            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                            id="minAmount"
                            placeholder="enter your couponCode minAmount..."
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="block text-gray-700 font-semibold mb-2"
                          >
                            maxAmount
                          </label>
                          <input
                            type="number"
                            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                            id="maxAmount"
                            placeholder="enter your couponCode minAmount..."
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor=""
                            className="block text-gray-700 font-semibold mb-2"
                          >
                            selectedProduct
                          </label>
                          <select
                            required
                            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                            id="selectedProduct"
                            placeholder="enter your product name..."
                            onChange={(e) => handleChange(e)}
                          >
                            <option>select product</option>
                            {products &&
                              products.map((item, index) => {
                                return <option key={index}>{item.name}</option>;
                              })}
                          </select>
                        </div>
                        <button
                          className="py-1 px-3 bg-black text-white text-[15px] rounded w-full mb-3 cursor-pointer"
                          type="submit"
                        >
                          Create Coupon Code
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCoupons;
