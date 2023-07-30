import React, { useState, useEffect } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import styled from "styled-components";

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {

    async function fetchData() {

      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
    }
  }

  return (
    <RowContainer>
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie )=> {
          return <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
        })}
      </div>
      <div style={{ padding: "10px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
    </RowContainer>
  );
}

const RowContainer=styled.div`
.row {
    color: #fff;
    margin-left: 20px;
    margin-top:20px;
  }
  
  .row_posters {
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
  }
  
  .row_posters::-webkit-scrollbar {
    display: none;
  }
  
  .row_poster {
    object-fit: contain;
    width: 100%;
    max-height: 100px;
    margin-right: 10px;
    transition: transform 250ms;
  }
  
  .row_poster:hover {
    transform: scale(1.1);
  }
  
  .row_posterLarge {
    max-height: 250px;
  }
  
  .row_posterLarge:hover {
    transform: scale(1.05);
  }



`



export default Row;
