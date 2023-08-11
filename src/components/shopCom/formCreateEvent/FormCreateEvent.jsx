import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductError,
  setProductStart,
  setProductSuccess,
} from "../../../redux/reducers/productReducer";
import apiAxios from "../../../utils/apiAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";

const FormCreateEvent = () => {
  const { shopInfo } = useSelector((state) => state.shop);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: null,
    description: null,
    category: null,
    tages: null,
    originalPrice: null,
    priceDiscount: null,
    productStock: null,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  // change inputs
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  //   select images
  const handleChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => {
      return [...prev, ...files];
    });
  };

  const handleStartDate = (e) => {
    const start = new Date(e.target.value);
    const minEndDate = new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    setEndDate(null);
    setStartDate(start);
    document.getElementById("endDate").min = minEndDate;
  };

  const handleEndDate = (e) => {
    const end = new Date(e.target.value);
    setEndDate(end);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  //   send request
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setProductStart());
    const newForm = new FormData();

    newForm.append("name", inputs.name);
    newForm.append("description", inputs.description);
    newForm.append("category", inputs.category);
    newForm.append("originalPrice", inputs.originalPrice);
    newForm.append("priceDiscount", inputs.priceDiscount);
    newForm.append("productStock", inputs.productStock);
    newForm.append("tages", inputs.tages);
    newForm.append("shopId", shopInfo._id);
    newForm.append("startDate", startDate);
    newForm.append("endDate", endDate);
    images.forEach((image) => {
      newForm.append("images", image);
    });

    try {
      const { data } = await apiAxios.post("events/create-event", newForm);
      toast.success("success create event");
      navigate("/dashboard-events");
      dispatch(setProductSuccess(data.product));
    } catch (error) {
      dispatch(setProductError(error));
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="w-[90%] md:w-[60%] h-[80vh] bg-white rounded overflow-y-auto p-4">
      <h3 className="text-center font-semibold text-[20px]">Create Event</h3>
      <form className="mt-[40px]" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="name"
            placeholder="enter your event product name..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            type="text"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400 h-[200px] resize-none"
            id="description"
            placeholder="enter your event product name..."
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="category"
            placeholder="enter your event product name..."
            onChange={(e) => handleChange(e)}
          >
            <option>select category</option>
            {categoriesData &&
              categoriesData.map((item, index) => {
                return <option key={index}>{item.title}</option>;
              })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Tages
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="tages"
            placeholder="enter your event product tages ..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Original Price
          </label>
          <input
            type="number"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="originalPrice"
            placeholder="enter your event product originalPrice ..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Price Discount
          </label>
          <input
            type="number"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="priceDiscount"
            placeholder="enter your event product originalPrice ..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Product Stock
          </label>
          <input
            type="number"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="productStock"
            placeholder="enter your event product originalPrice ..."
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            Start Date
          </label>
          <input
            type="date"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="startDate"
            min={today}
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            placeholder="enter your event product originalPrice ..."
            onChange={(e) => handleStartDate(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="block text-gray-700 font-semibold mb-2">
            End Date
          </label>
          <input
            type="date"
            required
            className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
            id="startDate"
            min={minEndDate}
            placeholder="enter your event product originalPrice ..."
            onChange={(e) => handleEndDate(e)}
          />
        </div>
        <div className="mb-3">
          <span className="block text-gray-700 font-semibold mb-2">Images</span>
          <div className="flex items-center gap-3 flex-wrap">
            <label
              htmlFor="images"
              className="block text-gray-700 font-semibold mb-2 cursor-pointer"
            >
              <GrAddCircle size={25} />
            </label>
            <input
              type="file"
              multiple
              className="hidden"
              id="images"
              onChange={(e) => handleChangeImage(e)}
            />
            {images &&
              images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  className="w-[100px] h-[100px] rounded-md  object-cover"
                />
              ))}
          </div>
        </div>
        <button
          className="py-1 px-3 bg-black text-white text-[15px] rounded w-full mb-3 cursor-pointer"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default FormCreateEvent;
