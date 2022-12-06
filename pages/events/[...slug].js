import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getFilteredEvents } from "../../backend-helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = (props) => {
  const router = useRouter();

  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return <h3 className="center">Loading...</h3>;
  // }

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <ErrorAlert>
        <div className="center">
          <h4>Invalid URL to show any specific event!!!</h4>
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <ErrorAlert>
        <div className="center">
          <h4>No event found for the chosen date</h4>
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filteredData = params.slug;
  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
};

export default FilteredEventsPage;
