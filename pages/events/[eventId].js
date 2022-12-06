import React, { Fragment } from "react";

import {
  getEventById,
  getFeaturedEvents,
} from "../../backend-helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Button from "../../components/ui/button";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
  if (!event) {
    return {
      redirect: {
        destination: "/error",
      },
    };
  } else {
    return {
      props: {
        selectedEvent: event,
      },
      revalidate: 3600,
    };
  }
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
