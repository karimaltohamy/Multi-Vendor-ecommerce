import React, { Fragment, useEffect, useState } from "react";
import "./header.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import { productData, categoriesData } from "../../static/data";
import { IoIosArrowForward } from "react-icons/io";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Dropmenu from "../dropmenu/Dropmenu";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import MenuMobile from "../menuMobile/MenuMobile";
import Cart from "../cart/Cart";
import FavoriteList from "../favoriteList/FavoriteList";
import logoImg from "../../images/logo2.png"
const Header = () => {
  const [term, setTerm] = useState("");
  const [searchData, setSarchData] = useState([]);
  const [openDropmenu, setOpenDropmenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openFavoriteList, setOpenFavoriteList] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { shopInfo } = useSelector((state) => state.shop);
  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();


  const handleSearch = (e) => {
    setTerm(e.target.value);

    const result =
      allProducts &&
      allProducts.filter((item) =>
        item.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      );
    setSarchData(result);
  };

  return (
    <div className="bg-white">
      <div className={styles.custom_container}>
        <div className={` flex items-center justify-between py-3 `}>
          <BiMenuAltLeft
            size={30}
            className=" cursor-pointer block md:hidden"
            onClick={() => setOpenMenu(true)}
          />
          <Link to="/">
            <img
              src={logoImg}
              alt="logo"
              className="w-[110px] md:w-[180px]"
            />
          </Link>
          <div className="w-[50%] p-1 border-2 border-blue-600 rounded-md hidden md:flex items-center gap-2 relative  ">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none w-full"
              value={term}
              onChange={(e) => handleSearch(e)}
            />
            <AiOutlineSearch size={25} />
            {term && searchData.length !== 0 ? (
              <div className="absolute top-[35px] left-0 bg-white p-2 h-[70vh] rounded shadow-md">
                {searchData &&
                  searchData.map((item) => {
                    const d = item.name;
                    const product_name = d.replace(/\s+/g, "-");
                    return (
                      <Link
                        to={`/product/${product_name}`}
                        className="flex items-center gap-2 mb-2"
                      >
                        <img
                          src={`${backend_url}${item.images[0]}`}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className="">
            <Link
              to={shopInfo ? "/dashboard" : "/create-shop"}
              className={
                " bg-black text-white md:px-5 text-[14px] md:text-[16px] py-2 px-3 md:py-3 rounded-md hidden md:flex items-center gap-2 "
              }
            >
              {shopInfo ? "Dashboard" : "Become Seller"}
              <IoIosArrowForward size={20} className="w-[16px]" />
            </Link>

            <div
              className="relative cursor-pointer block md:hidden"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-black" />
              <span className="bg-[#3bc177] w-[16px] h-[16px] rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-[12px]">
                {" "}
                0
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={` bg-[#3E3CCA] hidden md:block py-2 `}>
        <div
          className={`flex items-center justify-between ${styles.custom_container}  `}
        >
          <div className="relative">
            <div
              className={
                "bg-white py-2 px-3 md:py-4 md:px-5 rounded-md  flex items-center gap-2 cursor-pointer"
              }
              onClick={() => setOpenDropmenu(!openDropmenu)}
            >
              <HiMenuAlt1 size={25} className="w-[18px] md:w-[25px]" />
              <span className="text-[14px] md:text-[16px]">All Categories</span>
              <IoIosArrowDown size={20} className="w-[18px] md:w-[25px]" />
            </div>
            {openDropmenu && (
              <Dropmenu
                data={categoriesData}
                setOpenDropmenu={setOpenDropmenu}
              />
            )}
          </div>
          {/* start navbar items*/}
          <div>
            <Navbar />
          </div>
          {/* end navbar items*/}
          <div className="flex items-center gap-5">
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenFavoriteList(true)}
            >
              <AiOutlineHeart size={30} className="text-white" />
              <span className="bg-[#3bc177] w-[16px] h-[16px] rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-[12px]">
                {" "}
                {wishlist.length}
              </span>
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} className="text-white" />
              <span className="bg-[#3bc177] w-[16px] h-[16px] rounded-full text-white absolute -top-1 -right-1 flex items-center justify-center text-[12px]">
                {" "}
                {cart.length}
              </span>
            </div>
            <div className="relative cursor-pointer">
              {userInfo ? (
                <Link to={"/profile"}>
                  <img
                    src={`${backend_url}${userInfo.avatar}`}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <CgProfile size={30} className="text-white" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <MenuMobile active={openMenu} setOpenMenu={setOpenMenu} />
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openFavoriteList && (
        <FavoriteList setOpenFavoriteList={setOpenFavoriteList} />
      )}
    </div>
  );
};

export default Header;
