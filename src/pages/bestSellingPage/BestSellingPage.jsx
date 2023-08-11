import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { productData } from "../../static/data";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "../../styles/style";

const BestSellingPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const d = productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);
  return (
    <div>
      <Header />
      <div className={`${styles.custom_container}`}>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 mt-3 md:mt-8">
          {data && data.map((item, i) => <ProductCard key={i} item={item} />)}
        </div>
        {data && data.length === 0 ? (
          <div className="text-[20px] font-semibold text-center mx-5">
            No Products Found!
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
