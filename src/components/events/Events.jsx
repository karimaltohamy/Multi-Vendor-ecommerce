import React from "react";
import CountDwon from "../countDwon/CountDwon";
import { backend_url } from "../../server";
const Events = ({ event }) => {
  return (
    <div className="bg-white p-3 rounded-md flex items-center flex-col lg:flex-row">
      <div className="w-full lg:w-[50%]">
        <img
          src={`${backend_url}${event?.images[0]}`}
          alt="img-event"
          className="w-[60%] md:w-[80%] m-auto "
        />
      </div>
      <div className="w-full lg:w-[50%]">
        <h4 className="text-[18px] md:text-[22px] font-semibold mb-1 md:mb-3 ">
          {event?.name}
        </h4>
        <p className="text-gray-800 text-[13px] md:text-[17px] md:leading-[1.7]">
          {event?.description}
        </p>
        <div className="flex items-center gap-2 mt-1 md:mt-3">
          <span className="text-red-500 text-[14px] md:text-[19px] line-through block">
            {event?.originalPrice}$
          </span>
          <span className="text-[14px] md:text-[19px] font-semibold">
            {event?.priceDiscount}$
          </span>
        </div>
        <CountDwon event={event} />
      </div>
    </div>
  );
};

export default Events;
