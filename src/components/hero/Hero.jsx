import React from "react";
import "./hero.scss";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import bgHero from "../../images/home-19-slider-1.webp";

const Hero = () => {
  return (
    <div
      className="hero  h-[70vh] md:h-[83vh] bg-no-repeat	bg-cover"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className={`${styles.custom_container} h-full `}>
        <div className="h-full flex justify-center items-center text-white md:items-start flex-col w-[100%] md:w-[50%] text-center md:text-start">
          <h1 className="font-bold mb-1 md:mb-3 text-[30px] md:text-[50px]">
            <span className="text-[#0EFFDB]">Huge Saving on</span> <br />
            UHD Televisions
          </h1>
          <p className="md:text-[19px] md:leading-[1.6] mb-1 md:mb-3">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
            consequuntur natus quasi laudantium, voluptatibus cupiditate aliquam
            tempore ab eum omnis rerum ipsa, incidunt et officiis architecto
            impedit quod corrupti explicabo?
          </p>
          <Link
            to={"/"}
            className="py-2 px-3 md:py-3 md:px-5 text-[15px] rounded-full text-white border border-white inline-block w-fit"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
