import React from "react";
import Header from "../../components/header/Header";
import Events from "../../components/events/Events";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents } = useSelector((state) => state.event);
  return (
    <div>
      <Header />
      <div className="py-10">
        {allEvents &&
          allEvents.map((event) => {
            return <Events event={event} />;
          })}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
