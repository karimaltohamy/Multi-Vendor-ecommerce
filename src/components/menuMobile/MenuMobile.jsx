import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineSearch,
} from "react-icons/ai";
import { productData } from "../../static/data";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { IoIosArrowForward } from "react-icons/io";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";

const MenuMobile = ({ active, setOpenMenu }) => {
  const [term, setTerm] = useState("");
  const [searchData, setSarchData] = useState([]);
  const {userInfo} = useSelector(state => state.user)

  const handleSearch = (e) => {
    setTerm(e.target.value);

    const result = productData.filter((item) =>
      item.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setSarchData(result);
  };

  return (
    <div
      className={`fixed top-0 ${
        active ? "left-0" : "left-[-130%] "
      } w-full h-full bg-[#000000a0] transition-all duration-300 ease-linear z-[999]`}
    >
      <div className=" w-[75vw] h-full bg-white p-[15px]">
        <div className="flex items-center justify-between">
          <div className="relative cursor-pointer">
            <AiOutlineHeart size={30} className="" />
            <span className="bg-[#3bc177] w-[16px] h-[16px] rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-[12px]">
              {" "}
              0
            </span>
          </div>
          <AiOutlineClose size={30} onClick={() => setOpenMenu(false)} />
        </div>
        <div className="w-[100%] p-1 border-2 border-blue-600 rounded-md flex items-center gap-2 relative mt-7 ">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full"
            value={term}
            onChange={(e) => handleSearch(e)}
          />
          <AiOutlineSearch size={25} />
          {term && searchData.length !== 0 ? (
            <div className="absolute top-[35px] left-0 bg-white p-2 min-h-[30vh] rounded shadow-md">
              {searchData &&
                searchData.map((item) => {
                  const d = item.name;
                  const product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link
                      to={`/products/${product_name}`}
                      className="flex items-center gap-1 mb-2"
                    >
                      <img
                        src={item.image_Url[0].url}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <span className="text-[14px]">{item.name}</span>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>

        <div className="mt-7">
          <Navbar mobile={true} />
        </div>
        <div className="block mt-7">
          <Link
            to={"/seller"}
            className={
              "bg-black text-white px-5 text-[16px]  py-3 rounded-md flex items-center gap-2 w-fit"
            }
          >
            Become Seller
            <IoIosArrowForward size={20} className="w-[16px]" />
          </Link>
        </div>
       {userInfo ?  <div className="flex items-center gap-2 mt-5">
       <img
              src={userInfo === null ? "" :`${backend_url}${userInfo.avatar}`}
              alt=""
              className="w-[70px] h-[70px] rounded-full object-cover border-2 border-green-500"
            />
            <span className="font-semibold">{userInfo !== null && userInfo.name}</span>
       </div> : <div className="text-center mt-[60px] text-gray-500">
          <Link to={"/login"} className="text-[20px] font-semibold">
            Login
          </Link>
          /
          <Link to={"/sign-up"} className="text-[20px] font-semibold">
            Sign Up
          </Link>
        </div>} 
      </div>
    </div>
  );
};

export default MenuMobile;
