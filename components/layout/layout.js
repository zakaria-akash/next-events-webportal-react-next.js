import React, { Fragment, useContext } from "react";

import MainFooter from "./main-footer";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

const Layout = (props) => {
  const NotificationCtx = useContext(NotificationContext);

  const activeNotification = NotificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <MainFooter />
    </Fragment>
  );
};

export default Layout;
