import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { Pivot as Hamburger } from "hamburger-react";
import "./MobileNav.css";

const Navbar = ({ isScrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const currentPath = window.location.pathname;

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Series", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const handleLink = () => {
    if (navActive) setNavActive(false);
    setShowSearch(false);
  };
  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="right flex a-center">
          {navActive === true ? (
            <div className="mainNav">
              <ul className="links flex">
                <div className={`searchT ${showSearch ? "show-searchT" : ""}`}>
                  <button
                    className="buttonT"
                    onFocus={() => setShowSearch(true)}
                    onBlur={() => {
                      if (!inputHover) {
                        setShowSearch(false);
                      }
                    }}
                  >
                    <FaSearch className="searchIconT" onClick={handleLink}/>
                  </button>
                  <input
                    className="inputT"
                    type="text"
                    placeholder="Search"
                    onMouseEnter={() => setInputHover(true)}
                    onMouseLeave={() => setInputHover(false)}
                    onBlur={() => {
                      setShowSearch(false);
                      setInputHover(false);
                    }}
                  />
                </div>
                {links.map(({ name, link }) => {
                  if (currentPath !== link) {
                    return (
                      <li
                        className="LetItBeH"
                        key={name+link}
                        onClick={() => handleLink(link)}
                      >
                        <Link to={link} onClick={handleLink}>
                          {name}
                        </Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          ) : null}
          <Hamburger
            className="HamB"
            size={25}
            toggled={navActive}
            toggle={setNavActive}
          />
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch size={20} className="searchIcon" />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            Signout<FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 999;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 3rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: black;
        color: #FFFFFF;
        display: flex;
        gap: 4px;
        align-items: center;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #FFFFFF;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.2rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100px;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
  @media (max-width: 700px) {
    nav {
      padding: 0 1.5rem;
      .left {
        gap: 1rem;
        .brand {
          img {
            height: 2rem;
          }
        }
        .links {
          transition: 0.3s ease-in-out;
          position: absolute;
          background: #1e1e1e;
          height: 100vh;
          width: 150px;
          right: 0px;
          top: 0px;
          display: flex;
          padding: 12px;
          padding-top: 80px;
          flex-direction: column;
          gap: 0.7rem;
          li {
            padding-left: 15px;
            padding-top: 12px;
            position: absolute;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .search {
      visibility: hidden;
      opacity: 0 !important;
      display: flex;
      gap: 0.1rem !important;
      align-items: center;
      justify-content: center;
      padding: 0.1rem !important;
      padding-left: 0.1rem !important;
      button {
        opacity: 0 !important;
        height: 0px !important;
        width: 0px !important;
        padding :0px !important;
        margin: 0px !important;
        visibility: hidden;
        background-color: transparent;
        border: none;
        &:focus {
          outline: none;

        }
        svg {
          color: white;
          font-size: 0px !important;
          visibility: hidden;
          opacity: 0 !important;
        }
      }
      .input {
        width: 0 !important;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease-in-out;
        background-color: transparent;
        border: none;
        color: white;
        opacity: 0 !important;
        &:focus {
          outline: none;
        }
      }
    }
    .show-search {
      opacity: 0 !important;
      border: 1px solid white;
      background-color: rgba(0, 0, 0, 0.6);
      visibility:hidden;
      width: 0px !important;
      input{
        opacity: 0 !important;
        width 0px !important;
        visibility: hidden !important;
      }
    }
    }
  }
`;
export default Navbar;
