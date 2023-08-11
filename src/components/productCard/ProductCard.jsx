import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCardDetails from "../productCardDetails/ProductCardDetails";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/reducers/cartReducer";
import { toast } from "react-toastify";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/reducers/wishlistReducer";

const ProductCard = ({ item }) => {
  const [click, setClick] = useState(false);
  const [openDetails, setOpenDetails] = useState();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleAddItemToCart = () => {
    const isItemExist = cart.find((ele) => ele._id === item._id);

    if (isItemExist) {
      toast.error("product is exist");
    } else {
      dispatch(addItemToCart({ ...item, qty: 1 }));
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
    setClick(true);
    dispatch(addItemToWishlist({ ...item, qty: 1 }));
  };

  const handleWishlistRemove = () => {
    setClick(false);
    dispatch(removeItemFromWishlist(item._id));
  };
  return (
    <div className="relative bg-white rounded-md p-3">
      <div className="mb-3">
        <img
          src={`${backend_url}${item?.images[0]}`}
          alt="img-product"
          className="w-full h-[150px] object-cover m-auto"
        />
      </div>
      <div>
        <span className="text-sm text-blue-600 block mb-3">
          {item.shop.shopName}
        </span>
        <Link
          to={`/products/${item._id}`}
          className="text-md font-semibold mb-2"
        >
          {item.name.length >= 40 && `${item?.name?.slice(0, 40)}...`}
        </Link>

        <div className="flex items-center gap-1">
          {Array(Math.round(4))
            .fill("")
            .map((ele, i) => {
              return (
                <AiFillStar key={i} size={20} className="text-[#ffcc00]" />
              );
            })}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[19px] font-semibold">
              {item.priceDiscount}$
            </span>
            {item.price && (
              <span className="text-red-500 line-through  text-[14px] -translate-y-2 block">
                {item.originalPrice}$
              </span>
            )}
          </div>
          <div className="text-green-500">{item.productStock} sold</div>
        </div>
      </div>
      <div className="top-5 right-2 absolute flex flex-col gap-3">
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
            title="Add to wishlist"
            className="cursor-pointer"
          />
        )}
        <AiOutlineEye
          size={22}
          title="Quick view"
          className="cursor-pointer"
          onClick={setOpenDetails}
        />
        <AiOutlineShoppingCart
          size={25}
          title="Add to cart"
          className="cursor-pointer"
          onClick={handleAddItemToCart}
        />
      </div>
      {openDetails && (
        <ProductCardDetails setOpenDetails={setOpenDetails} item={item} />
      )}
    </div>
  );
};

export default ProductCard;
