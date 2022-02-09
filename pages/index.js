import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Header from '../components/Header';
import List from '../components/List';
import Modal from '../components/Modal';

function Home() {
  const [movies, setMovies] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    title: '',
  });

  const [modal, setModal] = useState({
    data: null,
    isOpen: false,
  });

  const handleGetMovies = async () => {
    const { page, title } = params;

    const url = `http://www.omdbapi.com/?apikey=b3107253&type=movie&page=${page}&s=${title}`;
    const res = await (await fetch(url)).json();

    setMovies(res);
  }

  useEffect(() => {
    handleGetMovies();
  }, [params]);

  return (
    <div className={styles.home}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { modal.isOpen && <Modal modal={modal} setModal={setModal} /> }
      <div className={styles['home-wrap']}>
        <Header
          params={params}
          setParams={setParams}
          movies={movies}
        />
        <List
          setModal={setModal}
          movies={movies}
          setParams={setParams}
          params={params}
        />
      </div>
    </div>
  )
}

export default Home;
