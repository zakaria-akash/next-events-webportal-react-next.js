import React from "react";
import Link from "next/link";

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
    <li>
      <img src={"/" + image} alt="event-image" />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{customFormatedDate}</time>
          </div>
          <div>
            <address>{customFormatedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreEventsLink}>Explore Events</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
