import React, { useEffect } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/style";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";

const FeaturedCurds = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  return (
    <div className={`${styles.custom_container} mb-5`}>
      <h3 className="font-bold text-[25px] mb-5">Featured Products</h3>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
        {allProducts &&
          allProducts.map((item, i) => <ProductCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default FeaturedCurds;
