import React from "react";
import DashboardHeader from "../../../components/shopCom/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../../components/shopCom/dashboardSidebar/DashboardSidebar";
import FormCreateEvent from "../../../components/shopCom/formCreateEvent/FormCreateEvent";

const DashboardCreateEvent = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
        <div className="w-[60px] md:w-[20%] bg-white shadow">
          <DashboardSidebar />
        </div>
        <div className="w-full md:w-[85%] flex items-center justify-center">
          <FormCreateEvent />
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateEvent;
