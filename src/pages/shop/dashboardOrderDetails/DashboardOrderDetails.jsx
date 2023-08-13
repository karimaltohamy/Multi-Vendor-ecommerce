import React, { useEffect, useState } from "react";
import DashboardHeader from "../../../components/shopCom/dashboardHeader/DashboardHeader";
import { Link, useParams } from "react-router-dom";
import apiAxios from "../../../utils/apiAxios";
import { AiFillShopping } from "react-icons/ai";
import styles from "../../../styles/style";
import { backend_url } from "../../../server";
import { toast } from "react-toastify";

const DashboardOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [status, serStatus] = useState("");

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await apiAxios.get(`/orders/get-order/${id}`);

        setOrder(data.order);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, []);


  const upadteStatusOder = async (e) => {
    e.preventDefault();

    try {
      const { data } = await apiAxios.put(
        `/orders/update-status-order/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("update Status Order");
    } catch (error) {
        console.log(error);
      toast.error(error.data.response.message);
      
    }
  };

  return (
    <div>
      <DashboardHeader />

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
                  <div key={index} className="flex items-center gap-3 mb-4">
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
          <div className="mt-8">
            <h4 className="font-semibold mb-3 text-[18px]">
              Shipping Address:
            </h4>
            <form onSubmit={upadteStatusOder}>
              <select
                className="p-1 rounded"
                onChange={(e) => serStatus(e.target.value)}
              >
                {[
                  "Processing",
                  "Transferrd to deivery partner",
                  "Shipping",
                  "Receved",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferrd to deivery partner",
                      "Shipping",
                      "Receved",
                      "On the way",
                      "Delivered",
                    ].indexOf(order?.status)
                  )
                  .map((option, index) => {
                    return (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    );
                  })}
              </select>
              <button className="py-1 block mt-4 px-3 bg-red-200 text-red-500 rounded">
                Update Status
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderDetails;
