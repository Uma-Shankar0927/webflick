import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

const CardSlider = React.memo(({ data, title }) => {
  // console.log(data);
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const currentPath = window.location.pathname;

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 20) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };
  const generateKey = (i,k) => {
    return `${i}_${new Date().getTime()}_${k}`;
  };
  const renderTitleP = () => {
    if(currentPath === '/tv') return "Trending Series";
    return "Trending Movies"
  }
  return (
    <Container
      className="flex column"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2 className="h1Slider">
        {(currentPath==='/movies' || currentPath==='/tv') && title === "Trending Now" ?
          renderTitleP() : title
        }
      </h2>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>
        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={generateKey(index,movie.id)} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
});
const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 10px;
      margin-bottom: 20px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: -40px;
      // bottom: 0;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    // .none {
    //   display: none;
    // }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
  .h1Slider {
    margin-left: 40px;
    margin-bottom: 8px;
  }
  @media (max-width: 600px) {
    .h1Slider {
      font-size: 25px;
    }
  }
  @media (max-width: 350px) {
    .h1Slider {
      font-size: 20px;
      margin-left: 12px;
    }
  }
`;
export default CardSlider;
