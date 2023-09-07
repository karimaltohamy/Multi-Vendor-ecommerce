import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import { AiFillShopping, AiFillStar, AiOutlineStar } from "react-icons/ai";
import styles from "../../styles/style";
import { backend_url } from "../../server";
import Header from "../../components/header/Header";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [open, setOpen] = useState(false);
  const [selectItemCart, setSelectItemCart] = useState({});
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const getOrder = async () => {
    try {
      const { data } = await apiAxios.get(`/orders/get-order/${id}`);
      setOrder(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
    getOrder();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();

    const info = {
      rating,
      comment,
      user: userInfo,
      productId: selectItemCart._id,
    };


    try {
      const { data } = await apiAxios.put(`/products/add-review/${id}`, info, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("succeded add review");
      setOpen(false);
      setRating(1)
      setComment("")
      getOrder();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Header />

      <div className="my-5">
        <div className={`${styles.custom_container}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AiFillShopping size={35} color="red" />
              <h4 className="font-semibold text-[22px]">Order Details</h4>
            </div>
            <Link
              to={"/dashboard-orders"}
              className="py-2 px-4 bg-red-200 text-red-500 rounded"
            >
              Order List
            </Link>
          </div>
          <div className="flex items-center justify-between mt-7">
            <span className="text-gray-500">Order ID: #{id.slice(0, 8)}</span>
            <span className="text-gray-500">
              Placed on: {order?.createdAt.slice(0, 10)}
            </span>
          </div>
          <div className="mt-8 border-b border-gray-300 pb-3">
            {order?.cart &&
              order.cart.map((item, index) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div>
                        <img
                          src={`${backend_url}${item?.images[0]}`}
                          className="w-[80px] h-[80px] rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item?.name}</h4>
                        <span>
                          US${item?.priceDiscount} x {item?.qty}
                        </span>
                      </div>
                    </div>

                    {order.status === "Delivered" && (
                      <div>
                        {!item.isReviewed && (
                          <button
                            className="py-1 px-3 rounded bg-black text-white text-[14px]"
                            onClick={() => (
                              setOpen(true), setSelectItemCart(item)
                            )}
                            
                          >
                            Write Review
                          </button>
                        )}
                      </div>
                    )}

                    {open && (
                      <div className="fixed w-full h-full top-0 left-0 bg-[#0000007d] flex items-center justify-center">
                        <div className="bg-white h-[80vh] w-[50%] rounded relative p-2">
                          <IoIosCloseCircle
                            size={25}
                            className="top-2 right-2 absolute cursor-pointer"
                            onClick={() => setOpen(false)}
                          />

                          <h1 className="text-[20px] font-semibold text-center mt-5">
                            Give a Review
                          </h1>
                          <div className="flex items-center gap-3 my-5 ">
                            <div>
                              <img
                                src={`${backend_url}${selectItemCart?.images[0]}`}
                                className="w-[90px] h-[90px] rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold">
                                {selectItemCart?.name}
                              </h4>
                              <span>
                                US${selectItemCart?.priceDiscount} x{" "}
                                {selectItemCart?.qty}
                              </span>
                            </div>
                          </div>

                          <form onSubmit={handleAddReview}>
                            <div>
                              <label>
                                Give a Rating{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((item) => {
                                  return item <= rating ? (
                                    <AiFillStar
                                      size={20}
                                      className="text-[#ffc800] cursor-pointer"
                                      onClick={() => setRating(item)}
                                    />
                                  ) : (
                                    <AiOutlineStar
                                      size={20}
                                      className="text-[#ffc800] cursor-pointer"
                                      onClick={() => setRating(item)}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div className="mt-3">
                              <label>Write Comment</label>
                              <textarea
                                className="h-[200px] w-full border border-gray-300 rounded p-1"
                                onChange={(e) => setComment(e.target.value)}
                              ></textarea>
                            </div>
                            <button className="py-1 px-3 bg-black text-white rounded mt-3 text-[15px]">
                              Send Review
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="mt-2 text-end">
            Total Price:
            <span className="font-semibold"> US${order?.totalPrice}</span>
          </div>
          <div className="flex gap-3 justify-between mt-8">
            <div>
              <h4 className="font-semibold mb-3 text-[18px]">
                Shipping Address:
              </h4>
              <span className="mb-2 block">
                -{order?.shippingAddress?.address1}
              </span>
              <span className="mb-2 block">
                -{order?.shippingAddress?.address2}
              </span>
              <span className="mb-2 block">
                -{order?.shippingAddress?.city}
              </span>
              <span className="mb-2 block">
                -{order?.shippingAddress?.zipCode}
              </span>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[18px]">Payment Info:</h4>
              <span>- Status: {order?.paymentInfo.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
