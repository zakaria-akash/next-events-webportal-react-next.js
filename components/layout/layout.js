import React, { Fragment } from "react";
import MainFooter from "./main-footer";
import MainHeader from "./main-header";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </Fragment>
  );
};

export default Layout;
