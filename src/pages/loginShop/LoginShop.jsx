import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  setShopError,
  setShopStart,
  setShopSuccess,
} from "../../redux/reducers/shopReducer";

const LoginShop = () => {
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shopInfo } = useSelector((state) => state.shop);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setShopStart());
    try {
      const { data } = await apiAxios.post("/shops/login-shop", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setShopSuccess(data.info));
      toast.success(data.success && "Successful Login Shop");
      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
      dispatch(setShopError());
    }
  };

  useEffect(() => {
    if (shopInfo !== null) {
      navigate(`/dashboard`);
    }
  }, []);

  return (
    <div className="login h-screen flex items-center justify-center mx-2 bg-white">
      <div className="w-[500px] mx-auto shadow-lg p-8 rounded">
        <h3 className="font-bold text-2xl text-center mb-10">
          Login Shop to Your Account
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor=""
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-1 rounded-md"
              id="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <div className="w-full border border-gray-300 p-1 rounded-md flex gap-2 items-center">
              <input
                type={visible ? "text" : "password"}
                className="w-full outline-none"
                id="password"
                onChange={(e) => handleChange(e)}
              />
              {visible ? (
                <AiFillEye
                  size={25}
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiFillEyeInvisible
                  size={25}
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1">
              <input type="checkbox" />
              <label htmlFor="" className="font-semibold text-gray-600">
                remember me
              </label>
            </div>
            <a href="" className="text-blue-600 font-semibold text-sm">
              Forget Password ?
            </a>
          </div>
          <button className="py-2 w-full text-base font-semibold bg-blue-600 rounded text-white">
            Login
          </button>

          <p className="mt-5 text-gray-500 text-center">
            Not have any account?{" "}
            <Link to={"/createShop"} className="text-blue-600 font-semibold">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginShop;
