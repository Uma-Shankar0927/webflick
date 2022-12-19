import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import Card from "../components/Card";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { getUsersLikedMovies } from "../store";
import { useDispatch, useSelector } from "react-redux";

const UserLiked = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) {
      dispatch(getUsersLikedMovies(email));
    }
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // const generateKey = (i,k) => {
  //   return `${i}_${new Date().getTime()}_${k}`;
  // };
  // console.log(movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h2>My List</h2>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return (
              <Card index={index} movieData={movie} key={movie.id} isLiked={true} />
            );
          })}
          {movies.length === 0 ? "Add movies by clicking the plus icon in movie cards!" : ''}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 2rem;
    h2 {
      margin-left: 3rem;
    }
    .grid {
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  @media(max-width: 360px){
    .content{
      h2{
        margin-left: 2rem;
      }
    }
  }
  @media(max-width: 320px){
    .content{
      h2{
        margin-left: 1.5rem;
      }
    }
  }
`;
export default UserLiked;