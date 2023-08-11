import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateShop = () => {
  const [visible, setVisible] = useState(false);
  const [inputs, setInputs] = useState({
    ShopName: null,
    email: null,
    password: null,
    phoneNumber: null,
    address: null,
    zipCode: null,
  });
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const { shopInfo } = useSelector((state) => state.shop);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("shopName", inputs.ShopName);
    newForm.append("email", inputs.email);
    newForm.append("password", inputs.password);
    newForm.append("phoneNumber", inputs.phoneNumber);
    newForm.append("address", inputs.address);
    newForm.append("zipCode", inputs.zipCode);
    try {
      const { data } = await apiAxios.post(`/shops/create-shop`, newForm);
      toast.success(data.message);
      navigate("/login-shop");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shopInfo !== null) {
      navigate(`/dashboard`);
    }
  }, []);

  return (
    <div className="signup h-screen flex items-center justify-center mx-2 bg-white">
      <div className="w-[500px] mx-auto shadow-lg p-8 rounded">
        <h3 className="font-bold text-2xl text-center mb-10">
          Register as a new Shop
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor=""
              className="block text-gray-700 font-semibold mb-2"
            >
              Shop Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-1 rounded-md"
              id="ShopName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
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
          <div className="mb-3">
            <label
              htmlFor=""
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-1 rounded-md"
              id="phoneNumber"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex items-center gap-3 flex-col md:flex-row">
            <div className="mb-3 w-full md:w-[50%]">
              <label
                htmlFor=""
                className="block text-gray-700 font-semibold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-1 rounded-md"
                id="address"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor=""
                className="block text-gray-700 font-semibold mb-2"
              >
                Zip Code
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 p-1 rounded-md"
                id="zipCode"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            ) : (
              <AiOutlineUser size={"30px"} className="text-gray-500" />
            )}
            <div>
              <label
                htmlFor="file"
                className="py-1 px-6 border border-gray-300 rounded bg-white text-gray-500 cursor-pointer"
              >
                Upoload
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>
          </div>

          <button className="py-2 w-full text-base font-semibold bg-blue-600 rounded text-white">
            Submit
          </button>

          <p className="mt-5 text-gray-500 text-center">
            Already have an account?{" "}
            <Link to={"/login-shop"} className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
