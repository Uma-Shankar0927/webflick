import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";


const Slider = ({ movies }) => {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <>
    <Container>
      <CardSlider data={getMoviesFromRange(0, 35)} title="Trending Now" />
      <CardSlider data={getMoviesFromRange(10, 45)} title="New Releases" />
      <CardSlider data={getMoviesFromRange(20, 55)} title="Blockbuster Movies"/>
      <CardSlider data={getMoviesFromRange(30, 65)} title="Popular on WebFlick"/>
      <CardSlider data={getMoviesFromRange(40, 75)} title="Action Movies" />
      <CardSlider data={getMoviesFromRange(50, 85)} title="Epics" />
    </Container>
    </>
  );
}

const Container = styled.div`
// display: flex;
// flex-direction: column;
// justify-content: center;
// width: 100vw;
`;

export default Slider;