import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { DataGrid } from "@mui/x-data-grid";
import { MdTrackChanges } from "react-icons/md";
import { AiOutlineCamera } from "react-icons/ai";
import {
  setChangePasswordUserError,
  setChangePasswordUserSeccess,
  setChangePasswordUserStart,
  setUpdateUserError,
  setUpdateUserSeccess,
  setUpdateUserStart,
} from "../../redux/reducers/userReducer";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import Address from "../address/Address";

const ProfileContent = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState(userInfo === null ? "" : userInfo.name);
  const [email, setEmail] = useState(userInfo === null ? "" : userInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo === null ? null : userInfo.phoneNumber
  );
  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const inputs = { name, email, phoneNumber, password };

    if (password === null) {
      toast.error("enter password Please");
    }

    dispatch(setUpdateUserStart());

    try {
      const { data } = await apiAxios.put("/users/update-user", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setUpdateUserSeccess(data.user));
      toast.success("seccess updated user infomation");
    } catch (error) {
      dispatch(setUpdateUserError());
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (e) => {
    const value = e.target.files[0];

    dispatch(setUpdateUserStart());

    const formData = new FormData();
    formData.append("file", value);

    try {
      const { data } = await apiAxios.put(
        "/users/update-user-avatar",
        formData
      );

      dispatch(setUpdateUserSeccess(data.user));
    } catch (error) {
      console.log(error);
      dispatch(setUpdateUserError());
    }
  };

  return (
    <div>
      {active === 1 && (
        <div>
          <div className="mx-auto w-fit mb-[20px] relative">
            <img
              src={userInfo === null ? "" : `${backend_url}${userInfo.avatar}`}
              alt=""
              className="w-[100px] md:w-[140px] h-[100px] md:h-[140px] rounded-full object-cover border-2 border-green-500"
            />
            <label
              htmlFor="image"
              className="bottom-[10px] right-[15px] absolute"
            >
              <AiOutlineCamera size={20} />
            </label>
            <input
              type="file"
              className="hidden"
              id="image"
              onChange={handleUpdateAvatar}
            />
          </div>
          <form action="" onSubmit={handleUpdateUser}>
            <div className="flex items gap-[15px] mb-[20px] flex-wrap md:flex-nowrap">
              <div className="input_item w-full md:w-[50%]">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold mb-2 text-[14px] md:text-[16px] "
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full outline-none bg-white py-1 md:py-2 px-2 md:px-3 text-[14px] md:text-[16px] rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input_item w-full md:w-[50%]">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold mb-2 text-[14px] md:text-[16px] "
                >
                  Email Address
                </label>
                <input
                  type="text"
                  className="w-full outline-none bg-white py-1 md:py-2 px-2 md:px-3 text-[14px] md:text-[16px] rounded"
                  value={email === null ? "" : email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items gap-[15px] mb-[20px] flex-wrap md:flex-nowrap">
              <div className="input_item w-full md:w-[50%]">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold mb-2 text-[14px] md:text-[16px] "
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  className="w-full outline-none bg-white py-1 md:py-2 px-2 md:px-3 text-[14px] md:text-[16px] rounded"
                  value={phoneNumber === null ? "" : phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="input_item w-full md:w-[50%]">
                <label
                  htmlFor=""
                  className="block text-gray-700 font-semibold mb-2 text-[14px] md:text-[16px] "
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  className="w-full outline-none bg-white py-1 md:py-2 px-2 md:px-3 text-[14px] md:text-[16px] rounded"
                  value={password === null ? "" : password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-[8px] px-[50px] border border-blue-600 text-blue-600 font-semibold rounded-md"
            >
              Update
            </button>
          </form>
        </div>
      )}

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "3784wr76346298dhs23",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 2045,
      orderStatus: "processing",
    },
  ];

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
            to={`order/${params.id}`}
            className="py-[3px] px-[15px] text-white bg-black rounded"
          >
            <BsArrowRight size={20} />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        total: item.totalPrice,
      });
    });
  return (
    <div className="bg-white">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "3784wr76346298dhs23",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 2045,
      orderStatus: "processing",
    },
  ];

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
            to={`order/${params.id}`}
            className="py-[3px] px-[15px] text-white bg-black rounded"
          >
            <BsArrowRight size={20} />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        total: item.totalPrice,
      });
    });
  return (
    <div className="bg-white">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: "3784wr76346298dhs23",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 2045,
      orderStatus: "processing",
    },
  ];

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
            to={`order/${params.id}`}
            className="py-[2px] px-[6px] text-white bg-black rounded"
          >
            <MdTrackChanges size={20} />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        total: item.totalPrice,
      });
    });
  return (
    <div className="bg-white">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const dispatch = useDispatch();
  const { loadingChange } = useSelector((state) => state.user);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    dispatch(setChangePasswordUserStart());
    try {
      const { data } = await apiAxios.put(
        "/users/change-password-user",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setChangePasswordUserSeccess(data.user));
      toast.success("changed password successfull");
      setOldPassword(null);
      setNewPassword(null);
      setConfirmPassword(null);
    } catch (error) {
      console.log(error);
      dispatch(setChangePasswordUserError());
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="">
      {loadingChange ? (
        <Loader />
      ) : (
        <div>
          <h3 className="text-center font-semibold text-[20px] mb-3">
            Change Password
          </h3>
          <form
            className="max-w-[600px] mx-auto"
            onSubmit={handleChangePassword}
          >
            <div className="input_item mb-3">
              <label className="block mb-1 font-medium">
                Enter Yor Old Password
              </label>
              <input
                type="password"
                placeholder=""
                className="p-1 w-full"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="input_item mb-3">
              <label className="block mb-1 font-medium">
                Enter Yor New Password
              </label>
              <input
                type="password"
                placeholder=""
                className="p-1 w-full"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="input_item mb-3">
              <label className="block mb-1 font-medium">
                Enter Yor Confirm Password
              </label>
              <input
                type="password"
                placeholder=""
                className="p-1 w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="py-1 px-3 border border-blue-500 text-blue-500 font-medium w-full mt-2 rounded">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
