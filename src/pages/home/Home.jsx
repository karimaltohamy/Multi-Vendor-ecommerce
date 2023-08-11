import React, { Fragment } from "react";
import "./home.scss";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import Categoreis from "../../components/categories/Categoreis";
import BestDeals from "../../components/bestDeals/BestDeals";
import FeaturedCurds from "../../components/featuredCurds/FeaturedCurds";
import Events from "../../components/events/Events";
import Sponsored from "../../components/sponsored/Sponsored";
import Footer from "../../components/footer/Footer";
import styles from "../../styles/style";
import { useSelector } from "react-redux";

const Home = () => {
  const { allEvents } = useSelector((state) => state.event);
  return (
    <Fragment>
      <Header />
      <Hero />
      <Categoreis />
      <BestDeals />
      <div className={`${styles.custom_container} mb-5`}>
        <h3 className="font-bold text-[25px] mb-5">Popular Events</h3>
        <Events event={allEvents && allEvents[0]} />
      </div>
      <FeaturedCurds />
      <Sponsored />
      <Footer />
    </Fragment>
  );
};

export default Home;
