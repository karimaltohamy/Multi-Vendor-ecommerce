import React from "react";
import styles from "../../styles/style";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
  AiFillFacebook,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={`bg-black text-white`}>
      <div className="bg-[#2D25B8] py-10">
        <div
          className={` ${styles.custom_container} py-10 flex items-center justify-between flex-col md:flex-row text-center md:text-start`}
        >
          <h1 className="text-[25px] md:text-[35px] font-bold  mb-3 md:mb-0">
            <span className="text-[#3CA472]">Subscribe </span>
            use for get news
            <br />
            events and offers
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter Email..."
              className="py-2 px-3 rounded w-full "
            />
            <button className="py-2 px-4 rounded bg-[#3CA472] text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="pb-[20px] pt-10">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${styles.custom_container} pt-[50px]  mb-[60px]`}
        >
          <div className="text-center md:text-start mb-3 mf:mb-0">
            <div className="mb-2">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="img-footer"
                className="w-[140px] md:w-[180px] m-auto md:m-0 mb-5"
              />
            </div>
            <p className="text-[14px] md:text-[16px]">
              The home and elements needeed to create beatiful products.
            </p>
            <div className="flex items-center mt-[20px] gap-3 justify-center md:justify-start">
              <AiFillFacebook size={25} className="hover:text-[#3CA472]" />
              <AiOutlineTwitter size={25} className="hover:text-[#3CA472]" />
              <AiOutlineInstagram size={25} className="hover:text-[#3CA472]" />
              <AiFillYoutube size={25} className="hover:text-[#3CA472]" />
            </div>
          </div>
          <div className="text-center md:text-start">
            <h4 className="text-[20px] font-semibold mb-3">Company</h4>
            <ul>
              {footerProductLinks &&
                footerProductLinks.map((item, i) => {
                  return (
                    <li key={i} className="mb-1">
                      <Link
                        to={item.link}
                        className="text-gray-600 text-[15px]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h4 className="text-[20px] font-semibold mb-3">Shop</h4>
            <ul>
              {footercompanyLinks &&
                footercompanyLinks.map((item, i) => {
                  return (
                    <li key={i} className="mb-1">
                      <Link
                        to={item.link}
                        className="text-gray-600 text-[15px]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h4 className="text-[20px] font-semibold mb-3">Shop</h4>
            <ul>
              {footerSupportLinks &&
                footerSupportLinks.map((item, i) => {
                  return (
                    <li key={i} className="mb-1">
                      <Link
                        to={item.link}
                        className="text-gray-600 text-[15px]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className={` ${styles.custom_container} `}>
          <div className="flex items-center gap-3 justify-between flex-col md:flex-row">
            <span>© 2020 Becodemy. All rights reserved.</span>
            <span>Terms · Privacy Policy</span>
            <div className="">
              <img
                src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
