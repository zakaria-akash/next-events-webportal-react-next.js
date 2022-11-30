import React from "react";
import Link from "next/link";

import classes from "./event-item.module.css";

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
      <img src={"/" + image} alt="event-image" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{customFormatedDate}</time>
          </div>
          <div className={classes.address}>
            <address>{customFormatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreEventsLink}>Explore Events</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
