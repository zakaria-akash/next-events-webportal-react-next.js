import Head from "next/head";

import { NotificationContextProvider } from "../store/notification-context";
import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name="description"
            content="Find a lot of great events that enhance your potetialities..."
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
