import React from "react";
import Image from "next/dist/client/image";

import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = (props) => {
  const { id, title, image, date, location } = props;

  const customFormatedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const customFormatedAddress = location.replace(",", "\n");
  const exploreEventsLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt="event-image" width="auto" height="auto" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{customFormatedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{customFormatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreEventsLink}>
            <span>Explore Events</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
