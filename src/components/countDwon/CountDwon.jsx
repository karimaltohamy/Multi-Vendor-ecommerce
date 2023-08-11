import React, { useEffect, useState } from "react";

const CountDwon = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(event?.endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval, i) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[16px] md:text-[22px] text-[#475ad2]" key={i}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="mt-3">
      {timerComponents.length ? timerComponents : "Time's Up"}
    </div>
  );
};

export default CountDwon;
