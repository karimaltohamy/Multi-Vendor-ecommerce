import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageAltDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
  const { shopInfo } = useSelector((state) => state.shop);
  return (
    <div className="flex items-center justify-between bg-white p-3 shadow">
      <Link to={"/"} className="">
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          className="w-[100px] md:w-[160px]"
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link to={"/dashboard/cupouns"} className="hidden md:block">
          <AiOutlineGift size={25} />
        </Link>
        <Link to={"/dashboard-events"} className="hidden md:block">
          <MdOutlineLocalOffer size={25} />
        </Link>
        <Link to={"/dashboard-products"} className="hidden md:block">
          <FiShoppingBag size={25} />
        </Link>
        <Link to={"/dashboard-orders"} className="hidden md:block">
          <FiPackage size={25} />
        </Link>
        <Link to={"/dashboard-messages"} className="hidden md:block">
          <BiMessageAltDetail size={25} />
        </Link>
        <Link to={`/shop/${shopInfo._id}`}>
          <img
            src={`${backend_url}${shopInfo.avatar}`}
            alt=""
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
