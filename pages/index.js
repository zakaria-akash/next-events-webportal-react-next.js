import React, { Fragment } from "react";

import { getFeaturedEvents } from "../backend-helpers/api-utils";
import EventList from "../components/events/event-list";

const HomePage = (props) => {
  return (
    <Fragment>
      <EventList items={props.events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default HomePage;
