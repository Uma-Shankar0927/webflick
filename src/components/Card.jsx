import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";

const Card = React.memo(({ index, movieData, isLiked = false  }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(true);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("https://webflick-backend.onrender.com/api/user/add", {email,data: movieData});
    } catch (error) {
      console.log(error);
    }
  };
  const pleaseRemove = () => {
    window.location.reload(false);
    dispatch(removeMovieFromLiked({ movieId: movieData.id, email }))
  }
  return (
    <Container /*onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}*/ >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            {/* <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="card" onClick={() => navigate("/player")}/> */}
            {/* <video src={video} autoPlay={true} loop muted onClick={() => navigate("/player")}/> */}
          </div>
          <div className="info-container flex column">
            <h5 className="name" onClick={() => navigate("/player")}>
              {movieData.name.slice(0,15)}
              {movieData.name.length > 10 ? '...':''}
            </h5>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp size={30} title="Play" onClick={() => navigate("/player")}/>
                <RiThumbUpFill size={25} title="Like" />
                <RiThumbDownFill size={25} title="Dislike" />
                {isLiked ? (
                  <BsCheck size={25} title="Remove from List"
                    onClick={pleaseRemove}
                  />
                ) : (
                  <AiOutlinePlus size={25} title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown size={25} title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition: .3s ease-in;
    filter: opacity(60%);
  }
  .hover {
    // z-index: 99;
    // height: max-content;
    // width: 17rem;
    // position: absolute;
    // top: -10vh;
    // left: 0;
    // border-radius: 0.3rem;
    // box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    // background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      // position: relative;
      // height: 140px;
      // img {
      //   width: 100%;
      //   height: 140px;
      //   object-fit: cover;
      //   border-radius: 0.3rem;
      //   top: 0;
      //   z-index: 4;
      //   position: absolute;
      // }
      // video {
      //   width: 100%;
      //   height: 140px;
      //   object-fit: cover;
      //   border-radius: 0.3rem;
      //   top: 0;
      //   z-index: 5;
      //   position: absolute;
      // }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      background: #1e1e1e;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
        padding-top: 20px;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: .3rem;
        padding-top: 10px;
        li {
          list-style: none;
          font-size: 0.7rem;
          padding-right: 0.4rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
export default Card;
