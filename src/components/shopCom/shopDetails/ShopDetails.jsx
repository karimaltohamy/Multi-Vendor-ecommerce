import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../../server";
import { setLogoutShop } from "../../../redux/reducers/shopReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiAxios from "../../../utils/apiAxios";

const ShopDetails = ({ isOwner, shopData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlLogout = async () => {
    try {
      const { data } = await apiAxios.get("/shops/shop-logout");
      toast.success("logout success");
      dispatch(setLogoutShop());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 sticky top-[30px]">
      <div className="text-center">
        <img
          src={`${backend_url}${shopData.avatar}`}
          alt=""
          className="w-[140px] h-[140px] rounded-full object-cover m-auto"
        />
      </div>
      <div className="mt-[30px] flex flex-col gap-5">
        <div>
          <h5 className="text-[17px] font-medium">Address</h5>
          <span className="text-[14px] text-gray-400">{shopData.address}</span>
        </div>
        <div>
          <h5 className="text-[17px] font-medium">Phone Number</h5>
          <span className="text-[14px] text-gray-400">
            {shopData.phoneNumber}
          </span>
        </div>
        <div>
          <h5 className="text-[17px] font-medium">Total Products</h5>
          <span className="text-[14px] text-gray-400">10</span>
        </div>
        <div>
          <h5 className="text-[17px] font-medium">Shop Ratings</h5>
          <span className="text-[14px] text-gray-400">4/5</span>
        </div>
        <div>
          <h5 className="text-[17px] font-medium">Joined On</h5>
          <span className="text-[14px] text-gray-400">
            {shopData?.createdAt?.slice(0, 10)}
          </span>
        </div>
      </div>
      {isOwner && (
        <div className="mt-[30px]">
          <button className="py-1 px-3 bg-black text-white text-[15px] rounded w-full mb-3">
            Edit Shop
          </button>
          <button
            className="py-1 px-3 bg-black text-white text-[15px] rounded w-full"
            onClick={handlLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopDetails;
