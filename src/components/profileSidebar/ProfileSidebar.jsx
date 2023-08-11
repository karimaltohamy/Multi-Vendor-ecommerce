import React from "react";
import { BiLogOutCircle, BiShoppingBag } from "react-icons/bi";
import { BsChatDots, BsPerson } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { MdTrackChanges } from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri"
import { FaRegAddressCard } from "react-icons/fa";
import apiAxios from "../../utils/apiAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLogoutShop } from "../../redux/reducers/shopReducer";
import { setLogout } from "../../redux/reducers/userReducer";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlLogout = async () => {
    try {
      const { data } = await apiAxios.get("/users/logout");
      toast.success("logout success");
      dispatch(setLogout());
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-[15px] md:p-[25px] rounded-md">
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 1 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(1)}
      >
        <BsPerson size={25} color={active === 1 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Profile</span>
      </div>
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 2 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(2)}
      >
        <BiShoppingBag size={25} color={active === 2 ? "red" : ""} />
        <span className="text-[17px hidden md:block ">Orders</span>
      </div>
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 3 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(3)}
      >
        <TbTruckReturn size={25} color={active === 3 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Refunds</span>
      </div>
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 4 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(4)}
      >
        <BsChatDots size={25} color={active === 4 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Inbox</span>
      </div>
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 5 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(5)}
      >
        <MdTrackChanges size={25} color={active === 5 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Track Order</span>
      </div>
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 6 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={25} color={active === 6 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Change Password</span>
      </div>
      <div
        className={`item flex items-center gap-3 mb-[30px] cursor-pointer ${
          active === 7 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(7)}
      >
        <FaRegAddressCard size={25} color={active === 7 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Address</span>
      </div>
      <div
        className={`item flex items-center gap-3 cursor-pointer ${
          active === 8 ? "text-[red]" : ""
        }`}
        onClick={() => setActive(8) || handlLogout()}
      >
        <BiLogOutCircle size={25} color={active === 8 ? "red" : ""} />
        <span className="text-[17px] hidden md:block">Logout</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
