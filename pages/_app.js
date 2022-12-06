import Head from "next/head";

import Layout from "../components/layout/layout";
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
    </Layout>
  );
}

export default MyApp;
