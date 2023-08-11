import React from "react";
import styles from "../../styles/style";

const Sponsored = () => {
  return (
    <div
      className={`bg-white mt-10 py-5 px-2 md:py-10 md:px-5 rounded-md flex items-center justify-between ${styles.custom_container} flex-col md:flex-row`}
    >
      <div>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
          alt=""
          style={{ objectFit: "contain" }}
          className="w-[100px] md:w-[150px]"
        />
      </div>
      <div>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
          alt=""
          style={{ objectFit: "contain" }}
          className="w-[100px] md:w-[150px]"
        />
      </div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png"
          alt=""
          style={{ objectFit: "contain" }}
          className="w-[100px] md:w-[150px]"
        />
      </div>
      <div>
        <img
          src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png"
          alt=""
          style={{ objectFit: "contain" }}
          className="w-[100px] md:w-[150px]"
        />
      </div>
      <div>
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
          alt=""
          style={{ objectFit: "contain" }}
          className="w-[100px] md:w-[150px]"
        />
      </div>
    </div>
  );
};

export default Sponsored;
