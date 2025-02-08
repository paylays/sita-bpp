import { useEffect, memo, Fragment, useContext } from "react";
import { useLocation, Outlet } from "react-router-dom";

import {  ShepherdJourneyContext } from "react-shepherd";

import Header from "../partials/header";
import SubHeader from "../partials/sub-header";
import Sidebar from "../partials/sidebar";
import Footer from "../partials/footer";

import SettingOffCanvas from "../setting/SettingOffCanvas";
import Loader from "../Loader";
import * as SettingSelector from "../../store/setting/selectors";

import { useSelector } from "react-redux";

const Tour = () => {
  const tour = useContext(ShepherdJourneyContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (
      pathname === "/dashboard" &&
      sessionStorage.getItem("tour") !== "true"
    ) {
      tour?.start();
    }
  });
  return <Fragment></Fragment>;
};

const Layout = memo((props) => {
  const appName = useSelector(SettingSelector.app_name);
  useEffect(() => {});

  return (
    <Fragment>
      <Loader />
      <Sidebar app_name={appName} />
      <Tour />
      <main className="main-content">
        <div className="position-relative">
          <Header />
          <SubHeader />
        </div>
        <div className="py-0 conatiner-fluid content-inner mt-n5">
          {/* <DefaultRouter /> */}
          <Outlet />
        </div>
        <Footer />
      </main>
      <SettingOffCanvas />
    </Fragment>
  );
});

export default Layout;
