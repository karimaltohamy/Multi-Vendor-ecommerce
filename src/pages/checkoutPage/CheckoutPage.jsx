import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./checkout.scss";
import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import apiAxios from "../../utils/apiAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState("");
  const [discoutPrice, setDiscountPrice] = useState("");
  const navigate = useNavigate()

  const subtotal =
    cart && cart.reduce((acc, curr) => acc + curr.priceDiscount * curr.qty, 0);
  const shipping = subtotal * 0.01;
  const totalPrice = discoutPrice
    ? (subtotal + shipping - discoutPrice).toFixed(2)
    : (subtotal + shipping).toFixed(2);

  const handleGetCouponCode = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiAxios.get(
        `/couponCodes/getCouponCode/${couponCode}`
      );

      if (data.couponCode !== null) {
        const productsHaveDiscount =
          cart && cart.filter((item) => item.shopId === data.couponCode.shop);

        if (productsHaveDiscount.length !== 0) {
          const eligiblePrice = productsHaveDiscount.reduce(
            (acc, curr) => acc + curr.priceDiscount * curr.qty,
            0
          );

          const discoutPrice = (eligiblePrice * data.couponCode?.value) / 100;
          setDiscountPrice(discoutPrice);
          setCouponCodeData(data.couponCode);
          setCouponCode("");
        } else {
          toast.error("couponCode not valid");
        }
      } else {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToPayment = () => {
    const shippingAddress = {
      address1,
      address2,
      zipCode,
      country,
      city
    }

    const orderData = {
      cart,
      shipping,
      subtotal,
      discoutPrice,
      totalPrice,
      shippingAddress,
    } 

    // set order in localstorage
    localStorage.setItem("orderData", JSON.stringify(orderData))
    navigate("/payment")
  }

  return (
    <div>
      <Header />
      <div className={`max-w-[1000px] mx-auto my-[40px]`}>
        <div className="paths flex items-center justify-center gap-[40px]">
          <div className="path px-3 py-1 rounded-full text-white bg-red-500 font-medium ">
            1.Shipping
          </div>
          <div className="path px-3 py-1 rounded-full bg-red-100 text-red-500 font-medium">
            2.Payment
          </div>
          <div className="path px-3 py-1 rounded-full bg-red-100 text-red-500 font-medium">
            3.Success
          </div>
        </div>
        <div className="flex gap-8 mt-[50px]">
          <div className="w-[70%]">
            <FormCheckout
              userInfo={userInfo}
              zipCode={zipCode}
              setZipCode={setZipCode}
              country={country}
              setCountry={setCountry}
              city={city}
              setCity={setCity}
              address1={address1}
              setAddress1={setAddress1}
              address2={address2}
              setAddress2={setAddress2}
              handleGoToPayment={handleGoToPayment}
            />
          </div>
          <div className="w-[30%]">
            <CartData
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              handleGetCouponCode={handleGetCouponCode}
              subtotal={subtotal}
              shipping={shipping}
              discoutPrice={discoutPrice}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FormCheckout = ({
  userInfo,
  zipCode,
  setZipCode,
  country,
  setCountry,
  city,
  setCity,
  address1,
  setAddress1,
  address2,
  setAddress2,
  handleGoToPayment
}) => {
  const [open, setOpen] = useState(false);

  const handleAddress = (item, e) => {
    if (e.target.checked) {
      setCountry(item.country);
      setCity(item.city);
      setZipCode(item.zipCode);
      setAddress1(item.address1);
      setAddress2(item.address2);
    } else {
      setCountry("");
      setCity("");
      setZipCode("");
      setAddress1("");
      setAddress2("");
    }
  };
  return (
    <div>
      <div className="bg-white p-4 rounded">
        <h3 className="font-semibold text-[18px]">Shipping Address</h3>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 p-1  rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                value={userInfo.name}
              />
            </div>
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Email Address
              </label>
              <input
                type="text"
                required
                value={userInfo.email}
                className="w-full border border-gray-300  p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
              />
            </div>
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Phone Number
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300  p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                value={userInfo.phoneNumber}
              />
            </div>
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Zibe Code
              </label>
              <input
                type="number"
                required
                value={zipCode}
                className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Country
              </label>
              <select
                required
                className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                id="addressType"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
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
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                City
              </label>
              <select
                required
                className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                id="addressType"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              >
                <option>select type City</option>
                {State &&
                  State.getStatesOfCountry(country).map((item, index) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Address1
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
            </div>
            <div className="input_item">
              <label htmlFor="" className="blockfont-semibold mb-1">
                Address2
              </label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 p-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </form>
        <div className="mt-4">
          <p
            className="text-[15px] cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            Choose from Saved Address
          </p>
          {open && (
            <div>
              {userInfo.addresses.map((item, index) => {
                return (
                  <div className="flex items-center gap-1" key={index}>
                    <input
                      type="checkbox"
                      id={item.addressType}
                      onClick={(e) => handleAddress(item, e)}
                    />
                    <label htmlFor={item.addressType}>{item.addressType}</label>{" "}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <button className="mt-5 py-1 px-3 text-white bg-black rounded" onClick={handleGoToPayment}>
        Go To Payment
      </button>
    </div>
  );
};

const CartData = ({
  couponCode,
  setCouponCode,
  handleGetCouponCode,
  subtotal,
  shipping,
  discoutPrice,
  totalPrice,
}) => {
  return (
    <div>
      <div className="bg-white p-4 rounded">
        <div className="flex items-center justify-between mb-3 text-[14px]">
          <h4 className="font-semibold">Subtotal:</h4>
          <span className="text-[14px] text-gray-500">${subtotal}</span>
        </div>
        <div className="flex items-center justify-between mb-3 text-[14px]">
          <h4 className="font-semibold">Shipping:</h4>
          <span className="text-[14px] text-gray-500">${shipping}</span>
        </div>
        <div className="flex items-center justify-between mb-3 text-[14px]">
          <h4 className="font-semibold">Discount:</h4>
          <span className="text-[14px] text-gray-500">{discoutPrice ? `$${discoutPrice}` : "-"}</span>
        </div>
        <h4 className="font-semibold text-end pt-2 border-t border-gray-300">
          ${totalPrice}
        </h4>

        <form className="mt-3" onSubmit={handleGetCouponCode}>
          <input
            type="text"
            placeholder="Coupon Code"
            className="p-1 border border-gray-300 rounded mb-1 text-[13px] w-full"
            onChange={(e) => setCouponCode(e.target.value)}
            value={couponCode}
          />
          <button className="py-1 border border-blue-500 text-blue-500 text-[13px] w-full mt-2 rounded">
            Apply Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
