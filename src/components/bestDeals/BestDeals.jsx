import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/style";
import ProductCard from "../productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";

const BestDeals = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {

    const a = allProducts && allProducts.slice(0, 5);
    setData(a);
  }, []);

  return (
    <div className={`${styles.custom_container} mb-5`}>
      <h3 className="font-bold text-[25px] mb-5">Best Salles</h3>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5">
        {data && data.map((item, i) => <ProductCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default BestDeals;
