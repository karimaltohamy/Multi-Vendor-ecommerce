import React from "react";
import { brandingData, categoriesData } from "../../static/data";
import styles from "../../styles/style";
import { useNavigate } from "react-router-dom";

const Categoreis = () => {
  const navigate = useNavigate();
  return (
    <div>
    <div className="bg-white">
      <div className={`py-10 ${styles.custom_container} `}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-white rounded-md mb-7">
          {brandingData &&
            brandingData.map((item, i) => {
              return (
                <div className="flex items-center justify-center py-5" key={i}>
                  <span className="w-[50px] h-[50px]">{item.icon}</span>
                  <div>
                    <h3 className="text-[18px] font-semibold">{item.title}</h3>
                    <p className="text-gray-500 text-[15px]">
                      {item.Description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      </div>

      <div className={`${styles.custom_container} mb-5`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 bg-white rounded-md p-3">
          {categoriesData &&
            categoriesData.map((item, i) => {
              const handleNavigate = (ele) => {
                navigate(`/products?category=${ele.title}`);
              };
              return (
                <div
                  className="flex items-center flex-col  gap-3 cursor-pointer"
                  onClick={() => handleNavigate(item)}
                  key={i}
                >
                  
                  <img
                    src={item.image_Url}
                    alt="img"
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <span>{item.title}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categoreis;
