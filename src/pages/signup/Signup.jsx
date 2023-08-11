import React, { useEffect, useState } from "react";
import "./signup.scss";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [inputs, setInputs] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

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
    newForm.append("name", inputs.name);
    newForm.append("email", inputs.email);
    newForm.append("password", inputs.password);
    try {
      const { data } = await apiAxios.post(
        "/users/create-user",
        newForm,
        config
      );
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="signup h-screen flex items-center justify-center mx-2 bg-white">
      <div className="w-[500px] mx-auto shadow-lg p-8 rounded">
        <h3 className="font-bold text-2xl text-center mb-10">
          Register as a new User
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor=""
              className="block text-gray-700 font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-1 rounded-md"
              id="name"
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
          <div className="mb-4">
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
            <Link to={"/login"} className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
