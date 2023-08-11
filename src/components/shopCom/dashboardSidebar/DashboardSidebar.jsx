import React from "react";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = () => {
  return (
    <div className="p-3 flex flex-col gap-7">
      <NavLink
        to={"/dashboard"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <RxDashboard size={25} />
        <span className="text-[18px] hidden md:block"> Dashbaord</span>
      </NavLink>
      <NavLink
        to={"/dashboard-orders"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <FiShoppingBag size={25} />
        <span className="text-[18px] hidden md:block">All Orders</span>
      </NavLink>
      <NavLink
        to={"/dashboard-products"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <FiPackage size={25} />
        <span className="text-[18px] hidden md:block">All Products</span>
      </NavLink>
      <NavLink
        to={"/dashboard-create-product"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <AiOutlineFolderAdd size={25} />
        <span className="text-[18px] hidden md:block">Create Product</span>
      </NavLink>
      <NavLink
        to={"/dashboard-events"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <MdOutlineLocalOffer size={25} />
        <span className="text-[18px] hidden md:block">All Event</span>
      </NavLink>
      <NavLink
        to={"/dashboard-create-event"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <VscNewFile size={25} />
        <span className="text-[18px] hidden md:block">Create Event</span>
      </NavLink>
      <NavLink
        to={"/dashboard-withdraw-money"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <CiMoneyBill size={25} />
        <span className="text-[18px] hidden md:block">Withdraw Money</span>
      </NavLink>
      <NavLink
        to={"/dashboard-messages"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <BiMessageSquareDetail size={25} />
        <span className="text-[18px] hidden md:block">Shop Inbox</span>
      </NavLink>
      <NavLink
        to={"/dashboard-coupons"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <AiOutlineGift size={25} />
        <span className="text-[18px] hidden md:block">Discount Codes</span>
      </NavLink>
      <NavLink
        to={"/dashboard-refunds"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <HiOutlineReceiptRefund size={25} />
        <span className="text-[18px] hidden md:block">Refunds</span>
      </NavLink>
      <NavLink
        to={"/dashboard-settings"}
        className={({ isActive }) =>
          isActive
            ? "text-[#c13b56] flex items-center gap-2"
            : " flex items-center gap-2 text-black"
        }
      >
        <AiOutlineSetting size={25} />
        <span className="text-[18px] hidden md:block">Settings</span>
      </NavLink>
    </div>
  );
};

export default DashboardSidebar;
