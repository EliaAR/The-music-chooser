import type { NextPage } from "next";
import Head from "next/head";
import { HomePage } from "../components/HomePage/HomePage";
import { Header } from "../components/Common/Header/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Music Chooser</title>
        <meta name="description" content="Pick out your song and enjoy it!!!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="The Music Chooser" />
      <HomePage />
    </div>
  );
};

export default Home;
