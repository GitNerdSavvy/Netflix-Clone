import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import Row from "./Row";

import axios from "./axios";
import requests from "./requests";
import styled from "styled-components";

function Netflix() {
  const [movie, setMovie] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      // Math.floor(Math.random() * request.data.results.length -1)
      return request;
    }
    fetchData();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <HeaderContainer>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
          backgroundPosition: "center center",
        }}
      >
        <TopNav isScrolled={isScrolled} />
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 200)}
          </h1>
        </div>

        <div className="banner--fadeBottom" />
      </header>
      <Row
        title="NETFLIX ORIGINALS"
        isLargeRow
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchCommedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentries} />
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  .banner {
    color: white;
    object-fit: contain;
    height: 448px;
  }

  .banner_contents {
    margin-left: 30px;
    padding-top: 240px;
    height: 190px;
  }

  .banner_title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }

  .banner_description {
    width: 45rem;
    line-height: 1.3;
    font-size: 0.8rem;
    max-width: 360px;
    height: 80px;
  }

  .banner_button {
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    margin-right: 1rem;
    background-color: rgb(51, 51, 51, 0.5);
  }

  .banner_button:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
  }

  .banner--fadeBottom {
    height: 7.4rem;
    margin-top: 93px;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
`;

export default Netflix;
