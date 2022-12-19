import React from "react";
import styled from "styled-components";
import background from "../assets/login.jpg";

const BackgroundImage = () => {
  return (
    <Container>
      <img src={background} alt="background" />
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  height: 100vh;
  background-size: cover;
  width: 100vw;
  img {
    height: 100%;
    width: 100%;
    background-size: cover;
    object-fit:cover;
  }
`;
export default BackgroundImage;