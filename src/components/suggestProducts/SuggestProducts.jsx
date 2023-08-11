import React, { useEffect, useState } from "react";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";

export const SuggestProducts = ({ productInfo }) => {
  const [productsSuggest, setProductsSuggest] = useState([]);
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const d =
      allProducts &&
      allProducts.filter((item) => item.category === productInfo?.category);
    setProductsSuggest(d);
  }, [productInfo]);
  return (
    <div className="py-[40px]">
      <div className="pb-[10px] border-b-2 border-gray-200">
        <h2 className="text-[23px] font-semibold">Related Products</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 mt-3 md:mt-8">
        {productsSuggest &&
          productsSuggest.map((item, i) => <ProductCard key={i} item={item} />)}
      </div>
    </div>
  );
};
