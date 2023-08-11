import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setUpdateAddressUserError,
  setUpdateAddressUserSeccess,
  setUpdateAddressUserStart,
} from "../../redux/reducers/userReducer";
import apiAxios from "../../utils/apiAxios";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import Loader from "../loader/Loader";
import { Country, State } from "country-state-city";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    address1: null,
    address2: null,
    city: "",
    country: "",
    zipCode: null,
    addressType: null,
  });
  const dispatch = useDispatch();
  const { loadingAddress, userInfo } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      inputs.address1 == null ||
      inputs.addressType == null ||
      inputs.city == null ||
      inputs.country == null ||
      inputs.address2 == null
    ) {
      toast.error("you must filed inputs");
    } else {
      dispatch(setUpdateAddressUserStart());

      try {
        const { data } = await apiAxios.put("/users/update-address", inputs, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        dispatch(setUpdateAddressUserSeccess(data.user));
        setOpen(false);
      } catch (error) {
        console.log(error);
        dispatch(setUpdateAddressUserError());
        toast.error(error.response.data.message);
      }
    }
  };

  const handleDeleteaddress = async (idAddress) => {
    dispatch(setUpdateAddressUserStart());
    try {
      const { data } = await apiAxios.delete(
        `/users/delete-address/${idAddress}`
      );
      toast.success("delete address successfull");
      dispatch(setUpdateAddressUserSeccess(data.user));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(setUpdateAddressUserError());
      
    }
  };

  return (
    <div className="">
      {loadingAddress ? (
        <Loader />
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[20px]">My Address</h3>
            <button
              className="bg-black py-1 px-4 text-[15px] text-white rounded"
              onClick={() => setOpen(true)}
            >
              Add New
            </button>
          </div>
          <div>
            {userInfo ? (
              userInfo.addresses.map((item, index) => {
                return (
                  <div
                    className="bg-white p-[15px] rounded mt-[20px]"
                    key={index}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-[15px]">
                          {item.addressType}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[15px]">
                          {item.address1}, {item.city}, {item.country}
                        </span>
                        <span className="text-[15px]">
                          {userInfo.createdAt.slice(0, 10)}
                        </span>
                      </div>

                      <div>
                        <span>{userInfo.phoneNumber}</span>
                      </div>

                      <div
                        className=" cursor-pointer"
                        onClick={() => handleDeleteaddress(item._id)}
                      >
                        <AiOutlineDelete size={20} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>not have any addresses</div>
            )}
          </div>

          {open && (
            <div className="fixed top-0 left-0 w-full h-full bg-[#000000c7]  flex items-center justify-center z-50">
              <div className="bg-white rounded-md p-3 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[500px] relative h-[550px] overflow-y-scroll">
                <IoIosCloseCircle
                  size={25}
                  className="top-2 right-2 absolute cursor-pointer"
                  onClick={() => setOpen(false)}
                />

                <h3 className="text-center font-semibold text-[20px]">
                  Create Address
                </h3>
                <form className="mt-[40px]" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      address1
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                      id="address1"
                      placeholder="enter your address 1..."
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      address2
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                      id="address2"
                      placeholder="enter your address 2..."
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      country
                    </label>
                    <select
                      required
                      className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                      id="country"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>select type Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      city
                    </label>
                    <select
                      required
                      className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                      id="city"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>select type City</option>
                      {State &&
                        State.getStatesOfCountry(inputs.country).map(
                          (item, index) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      zipCode
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                      id="zipCode"
                      placeholder="enter your zipCode..."
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      addressType
                    </label>
                    <select
                      required
                      className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                      id="addressType"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>select type address</option>
                      <option>default</option>
                      <option>home</option>
                      <option>office</option>
                    </select>
                  </div>
                  <button
                    className="py-1 px-3 bg-black text-white text-[15px] rounded w-full mb-3 cursor-pointer"
                    type="submit"
                  >
                    Create Address
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
