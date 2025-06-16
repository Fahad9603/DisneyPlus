import React, { useEffect } from "react";
import styled from "styled-components";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import { selectUserName } from "../features/user/UserSliec";

const NavMenu = () => {
  const userName = null;
  useEffect(() =>{
    auth.onAuthStateChanged(userAuth =>{
        if(userAuth){
            //logged in
            console.log(userAuth)
        }
        else{
            //logged out
        }
    })
  })
  
    return (!selectUserName ? (
    <SignIn/>
  ):(

    <NavMenuWrapper>
      <NavLink to="/home">
        <img src="/images/home-icon.svg" alt="HOME" />
        <span>HOME</span>
      </NavLink>
      <NavLink to="/search">
        <img src="/images/search-icon.svg" alt="SEARCH" />
        <span>SEARCH</span>
      </NavLink>
      <NavLink to="/wishlist">
        <img src="/images/watchlist-icon.svg" alt="WISHLIST" />
        <span>WISHLIST</span>
      </NavLink>
      <NavLink to="/originals">
        <img src="/images/original-icon.svg" alt="ORIGINALS" />
        <span>ORIGINALS</span>
      </NavLink>
      <NavLink to="/movies">
        <img src="/images/movie-icon.svg" alt="MOVIES" />
        <span>MOVIES</span>
      </NavLink>
      <NavLink to="/series">
        <img src="/images/series-icon.svg" alt="SERIES" />
        <span>SERIES</span>
      </NavLink>
    </NavMenuWrapper>
    )
  );
};

const NavMenuWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 12px;
  text-decoration: none;

  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }

  span {
    color: rgb(249, 249, 249);
    font-size: 13px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;

    &:before {
      background-color: rgb(249, 249, 249);
      border-radius: 0px 0px 4px 4px;
      bottom: -6px;
      content: "";
      height: 2px;
      left: 0px;
      opacity: 0;
      position: absolute;
      right: 0px;
      transform-origin: left center;
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      visibility: hidden;
      width: auto;
    }
  }

  &:hover {
    span:before {
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
    }
  }
`;

export default NavMenu;
