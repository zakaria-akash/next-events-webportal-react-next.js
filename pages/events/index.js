import React, { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "./events-search";
import { getAllEvents } from "../../backend-helpers/api-utils";

const AllEventsPage = (props) => {
  const router = useRouter();
  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 1800,
  };
};

export default AllEventsPage;
