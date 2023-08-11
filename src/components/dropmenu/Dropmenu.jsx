import React from "react";
import "./dropmenu.scss";
import { Link } from "react-router-dom";

const Dropmenu = ({ data, setOpenDropmenu }) => {
  return (
    <div className="bg-white absolute top-[53px] left-0 p-2 rounded-b-md shadow-md z-[999]">
      {data &&
        data.map((item, i) => {
          return (
            <Link
              to={`/products?category=${item.title}`}
              className="mb-2 flex items-center gap-2"
              key={i}
              onClick={() => setOpenDropmenu(false)}
            >
              <img
                src={item.image_Url}
                alt=""
                className="w-[30px] h-[30px] rounded-full"
              />
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
    </div>
  );
};

export default Dropmenu;
