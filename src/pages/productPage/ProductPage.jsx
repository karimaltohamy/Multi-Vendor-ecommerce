import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { productData } from "../../static/data";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "../../styles/style";
import { getAllProducts } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState();
  const { allProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts);
    } else {
      const d =
        allProducts &&
        allProducts.filter((item) => item.category === categoryData);
      setData(d);
    }
  }, [categoryData, allProducts]);
  return (
    <div>
      <Header />
      <div className={`${styles.custom_container}`}>
        {data?.length !== 0 ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 my-3 md:my-8">
            {data && data.map((item, i) => <ProductCard key={i} item={item} />)}
          </div>
        ) : (
          <div className="text-[20px] font-semibold text-center  py-8">
            No Products Found!
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
