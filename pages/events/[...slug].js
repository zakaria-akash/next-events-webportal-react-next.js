import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    "https://next-events-portal-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json()) //fetcher function for SWR hook
  );
  let headTagForThisComponent = (
    <Head>
      <title>Next Events || Filtered Events</title>
      <meta name="description" content="Next Events || Filtered Events Page" />
    </Head>
  );
  if (error) {
    return (
      <div>
        {headTagForThisComponent}
        <h3 className="center">Failed to load...</h3>
      </div>
    );
  }
  useEffect(() => {
    if (data) {
      const events = [];
      console.log("Data is available");

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return (
      <div>
        {headTagForThisComponent}
        <h3 className="center">Loading...</h3>
      </div>
    );
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  headTagForThisComponent = (
    <Head>
      <title>Next Events || Filtered Events</title>
      <meta
        name="description"
        content={`All filtered events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <ErrorAlert>
        {headTagForThisComponent}
        <div className="center">
          <h4>Invalid URL to show any specific event!!!</h4>
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <ErrorAlert>
        {headTagForThisComponent}
        <div className="center">
          <h4>No event found for the chosen date</h4>
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      {headTagForThisComponent}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
