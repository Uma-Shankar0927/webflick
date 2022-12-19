import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.png";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";


const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="background" className="background-image"/>
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button onClick={() => navigate("/player")} className="flex j-center a-center">
              <FaPlay size={20}/>
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle size={20}/>
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(20%);
    }
    img {
      height: 100vh;
      width: 100vw;
      background-size: cover;
      object-fit:cover;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 0rem;
        }
      }
      .buttons {
        margin: 2rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
  @media(max-width: 800px){
    .container {
      .logo {
        img {
          width: 80% !important;
          height: 80% !important;
          // margin-left: 3rem !important;
          margin-bottom: 1.5rem !important;
        }
      }
    }
    .buttons {
      margin: 1rem !important;
      margin-bottom: 2rem !important;
      gap: 2rem !important;
      button {
        font-size: .5rem; !important
        gap: 1rem !important;
        border-radius: 0.2rem;
        padding: 0.5rem !important;
        padding-left: .5rem !important;
        padding-right: 1rem !important;
        border: none;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }
    }
  }
  @media(max-width: 600px){
    .container {
      margin-bottom: 90px !important;
      .logo {
        img {
          width: 95% !important;
          height: 95% !important;
          margin-left: .5rem !important;
        }
      }
    }
    .buttons{
      button{
        font-size: 1rem !important;
        margin-left: 20px;
      }
    }
  }
  @media(max-width: 335px){
    .container {
      .logo {
        img {
          margin-left: 0.1rem !important;
        }
      }
    }
    .buttons{
      gap: .5rem !important;
      button{
        font-size: 1rem !important;
      }
    }
  }
`;
export default Netflix;