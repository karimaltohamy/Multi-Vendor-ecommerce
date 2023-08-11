import React from "react";
import Lottie from "react-lottie";
import animationData from "../../animation/animation_lk1lzef0.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Lottie options={defaultOptions} width={200} height={200} />
    </div>
  );
};

export default Loader;
