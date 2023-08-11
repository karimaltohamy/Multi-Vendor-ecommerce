import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backend_url } from "../../server";
import { getAllProductsShop } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsInfo = ({ productInfo }) => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    getAllProductsShop(productInfo?.shop?._id, dispatch);
  }, []);

  return (
    <div className="py-[40px] bg-gray-200 p-[12px] md:p-[25px] rounded-lg">
      <div className="head flex items-center md:justify-between gap-[6px] flex-wrap justify-center ">
        <h2
          className={`text-[18px] md:text-[20px] font-semibold cursor-pointer ${
            active === 0 ? "border-b-2 border-red-500" : ""
          }`}
          onClick={() => setActive(0)}
        >
          Product Details
        </h2>
        <h2
          className={`text-[18px] md:text-[20px] font-semibold cursor-pointer ${
            active === 1 ? "border-b-2 border-red-500" : ""
          }`}
          onClick={() => setActive(1)}
        >
          Product Reviews
        </h2>
        <h2
          className={`text-[18px] md:text-[20px] font-semibold cursor-pointer ${
            active === 2 ? "border-b-2 border-red-500" : ""
          }`}
          onClick={() => setActive(2)}
        >
          Seller Information
        </h2>
      </div>
      {active === 0 && (
        <div className="mt-[20px]">
          <p className="text-[13px] md:text-[17px] leading-[1.7] text-[gray] mb-[8px] md:mb-[15px]">
            {productInfo?.description}
          </p>
        </div>
      )}
      {active === 1 && (
        <div className="text-center text-[18px] font-semibold mt-[20px]">
          no review yet!
        </div>
      )}
      {active == 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-[20px]  gap-3">
          <div>
            {productInfo?.shop && (
              <Link
                to={`/shop/${productInfo.shop._id}`}
                className="flex items-center justify-center md:justify-start gap-2"
              >
                <img
                  src={`${backend_url}${productInfo?.shop.avatar}`}
                  alt="img-shop"
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h4 className="text-blue-500 font-semibold text-[15px]">
                    {productInfo?.shop.shopName}
                  </h4>
                  <span className="text-[14px]">
                    {productInfo.rating} rating
                  </span>
                </div>
              </Link>
            )}
            <p className="text-[17px] leading-[1.7] text-[gray] mt-[15px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              earum odio maxime enim voluptates ex corporis quaerat explicabo
              similique atque, necessitatibus repellat nemo nobis iusto facere
              repellendus fugit natus velit. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Aliquam earum odio maxime enim
            </p>
          </div>
          <div>
            <div className="text-[17px] font-bold flex items-center gap-1 justify-center md:justify-end mb-[8px]">
              Joined On:{" "}
              <span className="font-medium">
                {productInfo.shop?.createdAt?.slice(0, 10)}
              </span>
            </div>
            <div className="text-[17px] font-bold flex items-center gap-1 justify-center md:justify-end mb-[8px]">
              Total Products:{" "}
              <span className="font-medium">{products.length}</span>
            </div>
            <div className="text-[17px] font-bold flex items-center gap-1 justify-center md:justify-end mb-[8px]">
              Total Reviews: <span className="font-medium">131</span>
            </div>
            <Link
              to={"/"}
              className="bg-black text-white py-2 px-4 rounded flex items-center gap-1  text-[15px]  w-fit m-auto md:m-0  md:ml-auto"
            >
              Visit Shop
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsInfo;
