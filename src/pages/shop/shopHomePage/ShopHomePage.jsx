import React, { useEffect, useState } from "react";
import styles from "../../../styles/style";
import ShopDetails from "../../../components/shopCom/shopDetails/ShopDetails";
import ShopDetailsInfo from "../../../components/shopCom/shopDetailsInfo/ShopDetailsInfo";
import { useParams } from "react-router-dom";
import apiAxios from "../../../utils/apiAxios";
import { useSelector } from "react-redux";

const ShopHomePage = () => {
  const { id } = useParams();
  const [shopData, setShopData] = useState({});
  const { shopInfo } = useSelector((state) => state.shop);

  useEffect(() => {
    const getShopData = async () => {
      try {
        const { data } = await apiAxios.get(`shops/shop/${id}`);
        setShopData(data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getShopData();
  }, []);
  return (
    <div className={`${styles.custom_container}  h-full`}>
      <div className="flex gap-[30px] h-full py-[20px] ">
        <div className="w-[25%] bg-white">
          <ShopDetails
            shopData={shopData}
            isOwner={shopData._id === shopInfo._id ? true : false}
          />
        </div>
        <div className="w-[75%]">
          <ShopDetailsInfo
            shopData={shopData}
            isOwner={shopData._id === shopInfo._id ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
