import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { removeItemFromWishlist } from "../../redux/reducers/wishlistReducer";
import { addItemToCart } from "../../redux/reducers/cartReducer";
import { toast } from "react-toastify";

const FavoriteList = ({ setOpenFavoriteList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#000000a0] transition-all duration-300 ease-linear z-[999]`}
    >
      <div className=" w-[350px] h-full bg-white p-[15px] fixed top-0 right-0">
        <AiOutlineClose
          size={30}
          onClick={() => setOpenFavoriteList(false)}
          className="ml-auto cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <AiOutlineHeart size={35} />
          <span className="text-[20px] font-semibold">
            {wishlist.length} items
          </span>
        </div>
        <div className="mt-[30px] flex flex-col gap-5">
          {wishlist
            ? wishlist.map((item, index) => {
                return <FavoriteSingle key={index} data={item} />;
              })
            : "not have any Product"}
        </div>
      </div>
    </div>
  );
};

const FavoriteSingle = ({ data }) => {
  const totalPrice = data.priceDiscount * data.qty;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleWishlistRemove = () => {
    dispatch(removeItemFromWishlist(data._id));
  };

  const handleAddItemToCart = () => {
    const isItemExist = cart.find((ele) => ele._id === data._id);

    if (isItemExist) {
      toast.error("product is exist");
    } else {
      dispatch(addItemToCart({ ...data }));
    }
  };

  return (
    <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
      <AiOutlineClose
        size={35}
        className="cursor-pointer"
        onClick={handleWishlistRemove}
      />
      <div>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt="img-cart"
          className="min-w-[80px] h-[80px] object-cover"
        />
      </div>
      <div>
        <p className="text-[13px] ">{data.name}</p>
        <span className="text-[15px] text-gray-500 block mt-2">
          ${data.priceDiscount} * {data.qty}
        </span>
        <span className="font-semibold text-red-500 block">${totalPrice}</span>
      </div>
      <div onClick={handleAddItemToCart} className="cursor-pointer">
        <AiOutlineShoppingCart size={25} />
      </div>
    </div>
  );
};

export default FavoriteList;
