import Head from "next/head";

import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="Find a lot of great events that enhance your potetialities..."
        />
      </Head>
      <Component {...pageProps} />
      <Notification
        title="Test"
        message="This is Notification bar"
        status="success"
      />
    </Layout>
  );
}

export default MyApp;
