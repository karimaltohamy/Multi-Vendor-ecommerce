import React, { useEffect, useState } from "react";
import ProductCard from "../../productCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../../redux/actions/product";
import { productData } from "../../../static/data";

const ShopDetailsInfo = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    getAllProductsShop(id, dispatch);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-4">
          <h4
            className={`${active === 1 && "text-red-500"} cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Shop Products
          </h4>
          <h4
            className={`${active === 2 && "text-red-500"} cursor-pointer`}
            onClick={() => setActive(2)}
          >
            Running Events
          </h4>
          <h4
            className={`${active === 3 && "text-red-500"} cursor-pointer`}
            onClick={() => setActive(3)}
          >
            Shop Reviews
          </h4>
        </div>
        {isOwner && (
          <Link
            to={"/dashboard"}
            className="py-1 px-3 bg-black text-white text-[15px] rounded mb-3"
          >
            Dashboard
          </Link>
        )}
      </div>

      {active === 1 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3  xl:gap-5">
          {products &&
            products.map((item, i) => <ProductCard key={i} item={item} />)}
        </div>
      )}
    </div>
  );
};

export default ShopDetailsInfo;
