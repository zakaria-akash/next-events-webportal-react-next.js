import React, { Fragment } from "react";
import Head from "next/head";

import { getFeaturedEvents } from "../backend-helpers/api-utils";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="Find a lot of great events that enhance your potetialities..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 3600,
  };
};

export default HomePage;
