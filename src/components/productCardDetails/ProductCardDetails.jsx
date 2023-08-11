import React, { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/reducers/cartReducer";
import { toast } from "react-toastify";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/reducers/wishlistReducer";

const ProductCardDetails = ({ item, setOpenDetails }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleAddItemToCart = () => {
    const isItemExist = cart.find((ele) => ele._id === item._id);

    if (isItemExist) {
      toast.error("product is exist");
    } else {
      if (item.productStock < count) {
        toast.error("product have limited");
      } else {
        dispatch(addItemToCart({ ...item, qty: count }));
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((ele) => ele._id === item._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const handleWishlistAdd = () => {
    setClick(!click);
    dispatch(addItemToWishlist({ ...item, qty: count }));
  };

  const handleWishlistRemove = () => {
    setClick(!click);
    dispatch(removeItemFromWishlist(item._id));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000c7]  flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-3 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[800px] flex flex-col lg:flex-row relative h-[550px] overflow-y-scroll">
        <IoIosCloseCircle
          size={25}
          className="top-2 right-2 absolute cursor-pointer"
          onClick={() => setOpenDetails(false)}
        />
        <div className="w-full lg:w-[50%]">
          <div>
            <img
              src={`${backend_url}${item.images[0]}`}
              alt="img-details"
              className="w-[100%] h-[370px]"
            />
          </div>
          <Link
            to={`/shop/${item.shop._id}`}
            className="flex items-center gap-2 mt-3"
          >
            <img
              src={`${backend_url}${item.shop.avatar}`}
              alt="img-shop"
              className="w-[50px] h-[50px] rounded-full"
            />
            <div>
              <h4 className="text-blue-500 font-semibold text-[15px]">
                {item.shop.shopName}
              </h4>
              <span className="text-[14px]">{"4/5"} rating</span>
            </div>
          </Link>
          <button className="bg-black text-white py-2 px-4 rounded flex items-center gap-1 mt-7 text-[15px]">
            Send Message <AiOutlineMessage size={20} />
          </button>
          <span className="text-red-500 mt-6 font-medium block">
            ({item.productStock}) Sold out
          </span>
        </div>
        <div className="w-full lg:w-[50%] mt-5">
          <h4 className="text-[20px] font-semibold mb-2">{item.name}</h4>
          <p className="mb-3">{item.description}</p>
          <span className="font-semibold text-[20px]">
            ${item.originalPrice ? item.originalPrice : item.priceDiscount}
          </span>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center ">
              <button
                className="py-3 px-4 rounded bg-blue-600 text-white text-[15px]"
                onClick={() => (count > 1 ? setCount(count - 1) : null)}
              >
                -
              </button>
              <span className="py-3 px-4 bg-gray-300 text-[15px]">{count}</span>
              <button
                className="py-3 px-4 rounded bg-blue-600 text-white text-[15px]"
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            {click ? (
              <AiFillHeart
                size={22}
                className="text-red-500 cursor-pointer"
                title="Remove from wishlist"
                onClick={() => handleWishlistRemove()}
              />
            ) : (
              <AiOutlineHeart
                size={22}
                onClick={() => handleWishlistAdd()}
                className="cursor-pointer"
                title="Add to wishlist"
              />
            )}
          </div>
          <button
            className="bg-black text-white py-2 px-4 rounded flex items-center gap-1 mt-7 text-[15px] mb-3"
            onClick={handleAddItemToCart}
          >
            Add to Cart <AiOutlineShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetails;
