import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "../../styles/style";
import { Link, useParams } from "react-router-dom";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import ProductDetailsInfo from "../../components/productDetailsInfo/ProductDetailsInfo";
import { SuggestProducts } from "../../components/suggestProducts/SuggestProducts";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../redux/actions/product";
import { backend_url } from "../../server";
import { addItemToCart } from "../../redux/reducers/cartReducer";
import { toast } from "react-toastify";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/reducers/wishlistReducer";

const ProductDetails = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const { productInfo } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  const handleAddItemToCart = () => {
    const isItemExist = cart.find((ele) => ele._id === productInfo._id);

    if (isItemExist) {
      toast.error("product is exist");
    } else {
      if (productInfo.productStock < count) {
        toast.error("product have limited");
      } else {
        dispatch(addItemToCart({ ...productInfo, qty: count }));
      }
    }
  };

  useEffect(() => {
    getSingleProduct(id, dispatch);
  }, [id]);

  return (
    <div>
      <Header />
      <div className="product_details bg-white pb-[50px]">
        <div className={`${styles.custom_container}`}>
          <div className={`grid grid-cols-1 md:grid-cols-2 py-[80px]`}>
            <div>
              <div>
                <div>
                  <img
                    src={
                      productInfo?.images &&
                      `${backend_url}${productInfo?.images[select]}`
                    }
                    alt="img-product"
                    className="w-[400px] h-[370px] object-cover text-center m-auto"
                  />
                </div>
                <div className="flex items-center justify-center gap-5 mt-4">
                  {productInfo?.images &&
                    productInfo?.images.map((img, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={`${backend_url}${productInfo?.images[index]}`}
                            alt="img-product"
                            className={`w-[120px] text-center  cursor-pointer m-auto ${
                              select === index ? "border rounded" : ""
                            }`}
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-[20px] md:text-[22px] font-bold mb-2">
                {productInfo?.name}
              </h1>
              <span className="text-[17px] text-blue-500 font-semibold block mb-3">
                {productInfo?.category}
              </span>
              <p className="text-gray-600 md:text-[18px]">
                {productInfo?.description}
              </p>
              <div className="flex items-center mt-[30px] ">
                <button
                  className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full text-black text-[15px] "
                  onClick={() => (count > 1 ? setCount(count - 1) : null)}
                >
                  -
                </button>
                <span className="py-3 px-4  text-[15px]">
                  {count}
                </span>
                <button
                  className="w-[40px] h-[40px] flex items-center justify-center border border-black rounded-full text-black text-[15px]"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-black text-white py-2 px-4 rounded flex items-center gap-1 mt-7 text-[15px] mb-3"
                onClick={() => handleAddItemToCart()}
              >
                Add to Cart <AiOutlineShoppingCart size={20} />
              </button>
              <div className="flex items-start md:items-center gap-[15px] md:gap-[30px] mt-7 flex-col md:flex-row">
                {productInfo?.shop && (
                  <Link
                    to={`/shop/${productInfo.shop._id}`}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={`${backend_url}${productInfo?.shop.avatar}`}
                      alt="img-shop"
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div>
                      <h4 className="text-blue-500 font-semibold text-[15px]">
                        {productInfo.shop.shopName}
                      </h4>
                      <span className="text-[14px]">4/5 rating</span>
                    </div>
                  </Link>
                )}
                <button className="bg-[#442B9C] text-white py-2 px-4 rounded flex items-center gap-1  text-[15px]">
                  Send Message <AiOutlineMessage size={20} />
                </button>
              </div>
            </div>
          </div>
          <ProductDetailsInfo productInfo={productInfo} />
        </div>
      </div>
      <div className={`${styles.custom_container}`}>
        <SuggestProducts productInfo={productInfo} />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
