import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineShopping,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../redux/reducers/cartReducer";
import { GrFormClose } from "react-icons/gr";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const totalPrice =
    cart && cart.reduce((acc, ele) => acc + ele.priceDiscount * ele.qty, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#000000a0] transition-all duration-300 ease-linear z-[999]`}
    >
      <div className=" w-[350px] h-full bg-white p-[15px] fixed top-0 right-0">
        <AiOutlineClose
          size={30}
          onClick={() => setOpenCart(false)}
          className="ml-auto cursor-pointer"
        />
        <div className="flex items-center gap-2 ">
          <AiOutlineShopping size={35} />
          <span className="text-[20px] font-semibold">{cart.length} items</span>
        </div>
        <div className="mt-[30px] flex flex-col gap-5">
          {cart.length !== 0 ? (
            cart.map((item, index) => {
              return <CartSingle key={index} data={item} />;
            })
          ) : (
            <div className="text-center">not have any products</div>
          )}
        </div>
        {cart.length !== 0 && (
          <Link to={"/checkout"} className="py-3 w-full bg-red-500 text-white block rounded mt-4 text-center">
            Checkout(USD${totalPrice})
          </Link>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.priceDiscount * value;
  const dispatch = useDispatch();

  const increase = () => {
    if (data.productStock < value) {
      toast.error("product have limited");
    } else {
      setValue(value + 1);
      dispatch(addItemToCart({ ...data, qty: value + 1 }));
    }
  };

  const decrease = () => {
    setValue(value === 1 ? 1 : value - 1);
    dispatch(addItemToCart({ ...data, qty: value - 1 }));
  };

  const handleRemoveProductFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
      <div className="flex flex-col items-center">
        <button className="w-[25px] h-[25px] rounded-full flex items-center justify-center bg-red-500 text-white mb-2">
          <AiOutlinePlus size={20} onClick={() => increase()} />
        </button>
        <span className="mb-2 font-semibold">{value}</span>
        <button className="w-[25px] h-[25px] rounded-full flex items-center justify-center bg-gray-200 text-gray-600">
          <BsDash size={20} onClick={() => decrease()} />
        </button>
      </div>
      <div>
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt="img-cart"
          className="min-w-[80px] h-[80px] object-cover"
        />
      </div>
      <div>
        <p className="text-[13px] ">{data.name}</p>
        <span className="text-[15px] text-gray-500 block mt-2">
          ${data.priceDiscount} * {value}
        </span>
        <span className="font-semibold text-red-500 block">
          ${totalPrice && totalPrice}
        </span>
      </div>
      <div
        onClick={() => handleRemoveProductFromCart(data._id)}
        className="cursor-pointer"
      >
        <GrFormClose />
      </div>
    </div>
  );
};

export default Cart;
