import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./paymentPage.scss";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiAxios from "../../utils/apiAxios";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { IoIosCloseCircle } from "react-icons/io";

const PaymentPage = () => {
  const [orderData, setOrderData] = useState({});
  const { userInfo } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    setOrderData(orderData);
  }, []);

  const paymentData = {
    amount: orderData.totalPrice * 100,
  };

  const order = {
    cart: orderData.cart,
    shippingAddress: orderData.shippingAddress,
    user: userInfo,
    totalPrice: orderData.totalPrice,
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            discription: "payment",
            amount: {
              currency_code: "USD",
              value: orderData.totalPrice, // Replace with your desired amount
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paymentWithPaypal(paymentInfo);
      }
    });
  };

  const paymentWithPaypal = async (paymentInfo) => {
    order.paymentInfo = {
      id: paymentInfo.payer.id,
      status: "succeded",
      type: "Paypal",
    };

    await apiAxios.post("/orders/create-order", order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    navigate("/successfull");
    toast.success("order successfull");
    localStorage.setItem("orderData", JSON.stringify([]));
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  // payment with stripe
  const paymentHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await apiAxios.post("/payment/process", paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status == "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };
        }

        await apiAxios.post("/orders/create-order", order, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate("/successfull");
        toast.success("order successfull");
        localStorage.setItem("orderData", JSON.stringify([]));
        localStorage.setItem("cartItems", JSON.stringify([]));
      }
    } catch (error) {
      // toast.error(error.)
      console.log(error);
    }
  };

  // payment cash on delivary
  const handlePaymentCash = async () => {

    order.paymentInfo = {
      type: "cash"
    }

    await apiAxios.post("/orders/create-order", order, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/successfull");
    toast.success("order successfull");
    localStorage.setItem("orderData", JSON.stringify([]));
    localStorage.setItem("cartItems", JSON.stringify([]));
  }

  return (
    <div className="payment">
      <Header />
      <div className={`max-w-[1000px] mx-auto my-[40px]`}>
        <div className="paths flex items-center justify-center gap-[40px]">
          <div className="path px-3 py-1 rounded-full text-white bg-red-500 font-medium ">
            1.Shipping
          </div>
          <div className="path px-3 py-1 rounded-full text-white bg-red-500 font-medium">
            2.Payment
          </div>
          <div className="path px-3 py-1 rounded-full bg-red-100 text-red-500 font-medium">
            3.Success
          </div>
        </div>
        <div className="flex gap-8 mt-[50px]">
          <div className="w-[70%]">
            <PaymentInfo
              userInfo={userInfo}
              paymentHandler={paymentHandler}
              createOrder={createOrder}
              onApprove={onApprove}
              setOpen={setOpen}
              open={open}
              handlePaymentCash={handlePaymentCash}
            />
          </div>
          <div className="w-[30%]">
            <CartData
              subtotal={orderData.subtotal}
              shipping={orderData.shipping}
              discoutPrice={orderData.discoutPrice}
              totalPrice={orderData.totalPrice}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PaymentInfo = ({
  userInfo,
  paymentHandler,
  onApprove,
  createOrder,
  open,
  setOpen,
  handlePaymentCash
}) => {
  const [select, setSelect] = useState(1);
  return (
    <div className="bg-white p-4 rounded cursor-pointer">
      <div className="flex items-center gap-2" onClick={() => setSelect(1)}>
        <div className="circle w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-black">
          <span
            className={`w-[10px] h-[10px] rounded-full ${
              select == 1 ? "block" : "hidden"
            } bg-black `}
          ></span>
        </div>
        <h4>Pay With Bebit/credit Card</h4>
      </div>
      {select == 1 && (
        <form className="mt-2" onSubmit={paymentHandler}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-[50%]">
              <label
                htmlFor=""
                className="block text-gray-700 font-semibold mb-1 text-[15px]"
              >
                Name On Card
              </label>
              <input
                type="text"
                value={userInfo.name}
                className="w-full border border-gray-300 px-1 rounded-md focus:border-blue-500 placeholder:text-[13px] placeholder:text-gray-400"
              />
            </div>
            <div className="w-[50%]">
              <label
                htmlFor=""
                className="block text-gray-700 font-semibold mb-1 text-[15px]"
              >
                Exp Date
              </label>
              <CardExpiryElement
                className="border border-gray-300 p-1 rounded-md"
                id="cardExpiry"
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-[50%]">
              <label
                htmlFor=""
                className="block text-gray-700 font-semibold mb-1 text-[15px]"
              >
                Card Number
              </label>
              <CardNumberElement
                id="cardNumber"
                className="border border-gray-300 p-1 rounded-md"
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                    },
                  },
                }}
              />
            </div>
            <div className="w-[50%]">
              <label
                htmlFor=""
                className="block text-gray-700 font-semibold mb-1 text-[15px]"
              >
                CVV
              </label>
              <CardCvcElement
                id="cardCvc"
                className="border border-gray-300 p-1 rounded-md"
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                    },
                  },
                }}
              />
            </div>
          </div>
          <button className="py-1 px-3 bg-red-500 text-white rounded text-[15px] mt-2">
            Submit
          </button>
        </form>
      )}
      {/* payment with paypal */}
      <div
        className="flex items-center gap-2 cursor-pointer mt-3"
        onClick={() => setSelect(2)}
      >
        <div className="circle w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-black">
          <span
            className={`w-[10px] h-[10px] rounded-full ${
              select == 2 ? "block" : "hidden"
            } bg-black `}
          ></span>
        </div>
        <h4>Pay With Paybal</h4>
      </div>
      {select == 2 ? (
        <button
          className="py-1 px-3 bg-red-500 text-white rounded text-[15px] mt-2"
          onClick={() => setOpen(true)}
        >
          Submit
        </button>
      ) : (
        ""
      )}
      <div
        className="flex items-center gap-2 cursor-pointer mt-3"
        onClick={() => setSelect(3)}
      >
        <div className="circle w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-black">
          <span
            className={`w-[10px] h-[10px] rounded-full ${
              select == 3 ? "block" : "hidden"
            } bg-black `}
          ></span>
        </div>
        <h4>Cash On Delivary</h4>
      </div>
      {select == 3 && (
        <button className="py-1 px-3 bg-red-500 text-white rounded text-[15px] mt-2" onClick={handlePaymentCash}>
          Submit
        </button>
      )}

      {open && (
        <div className="top-0 left-0 fixed w-full h-full bg-[#0000006b] flex items-center justify-center">
          <div className="w-[400px] h-[400px] bg-white rounded relative">
            <IoIosCloseCircle
              size={25}
              className="top-2 right-2 absolute cursor-pointer text-black"
              onClick={() => setOpen(false)}
            />

            <div className="h-full flex items-center  justify-center">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AUzXgqkffyRr3dStq_8FgZ2Emux1bKQ2ZEgN2MQHay6czFoOiS1azd-B6XCx5Mo6GGdmR-QVaMJHGUK9",
                }}
              >
                <PayPalButtons
                  onApprove={onApprove}
                  createOrder={createOrder}
                  style={{ layout: "horizontal" }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CartData = ({ subtotal, shipping, discoutPrice, totalPrice }) => {
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
          <span className="text-[14px] text-gray-500">
            {discoutPrice ? `$${discoutPrice}` : "-"}
          </span>
        </div>
        <h4 className="font-semibold text-end pt-2">${totalPrice}</h4>
      </div>
    </div>
  );
};

export default PaymentPage;
