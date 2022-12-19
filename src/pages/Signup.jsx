import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({email: "",password: ""});
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
      if(error.code === 'auth/weak-password') alert("Password must be 6 charcters long!");
      else if(error.code === 'auth/email-already-in-use') alert("Already Signed Up.Please login!");
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>Ready to watch? Enter your email to create membership.</h3>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>setFormValues({...formValues,[e.target.name]: e.target.value})}
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>setFormValues({...formValues,[e.target.name]: e.target.value,})}
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display:flex;
  justify-content:center;
  align-items:center;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 1rem;
        h1 {
          padding: 0.25rem;
        }
      }
      .form {
        display: grid;
        grid-template-rows: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 270px;
        input {
          color: black;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          border: 1px solid black;
          background: #0A0A0A;
          color: #FFFFFF;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #FFFFFF;
          border: none;
          cursor: pointer;
          color: #0A0A0A;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #FFFFFF;
        border: none;
        cursor: pointer;
        color: #0A0A0A;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
  @media(max-width:640px){
    h1{
      font-size: 20px;
    }
    h2{
      font-size: 18px;
    }
    h3{
      font-size: 16px;
      display:none;
    }
  }
`;

export default Signup;
