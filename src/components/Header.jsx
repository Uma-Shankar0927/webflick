import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 3rem;
    }
  }
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #FFFFFF;
    border: none;
    cursor: pointer;
    color: #0A0A0A;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1rem;
  }
  @media(max-width:640px){
    padding: 0 1rem;
    .logo,img{
        height: .8rem;
    }
    button{
        font-weight: 300;
    }
  }
`;
export default Header;