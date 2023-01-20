import type { NextPage } from "next";
import Head from "next/head";
import { HomePage } from "../components/HomePage/HomePage";
import { Header } from "../components/Common/Header/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>The Music Chooser</title>
        <meta name="description" content="Pick out your song and enjoy it!!!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <HomePage />
    </div>
  );
};

export default Home;
