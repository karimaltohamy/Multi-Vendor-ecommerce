import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";
import { navItems } from "../../static/data";

const Navbar = ({ mobile }) => {
  return (
    <div
      className={`${
        mobile ? "flex flex-col items-start gap-[25px]" : "hidden md:flex"
      } md:items-center md:gap-3`}
    >
      {navItems &&
        navItems.map((item, i) => {
          return (
            <NavLink
              key={i}
              to={item.url}
              className={({ isActive }) =>
                isActive
                  ? "text-[#3bc177] text-[20px] font-semibold md:text-lg "
                  : "text-[20px] font-semibold md:text-lg text-black md:text-white"
              }
            >
              {item.title}
            </NavLink>
          );
        })}
    </div>
  );
};

export default Navbar;
