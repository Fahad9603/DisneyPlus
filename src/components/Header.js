import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  // Track the current route
  const { user } = useAuth();
  const auth = getAuth();
  const [isVisible, setIsVisible] = useState(true);

  // Hide Nav if the current route is '/SignIn'
  useEffect(() => {
    if (location.pathname === '/SignIn') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const handleAuth = () => {
    if (!user) {
      navigate("/SignIn");
    } else {
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }
  };

  if (!isVisible) return null;  // Don't render the Nav if it's not visible

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </MenuToggle>
      <Menu open={menuOpen}>
        {!user ? (
          <Login onClick={handleAuth}>Login</Login>
        ) : (
          <>
            <NavMenu>
              <Link to="/home">
                <img src="/images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
              </Link>
              <Link to="/search">
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </Link>
              <Link to="/wishlist">
                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>WATCHLIST</span>
              </Link>
              <Link to="/originals">
                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
              </Link>
              <Link to="/movies">
                <img src="/images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
              </Link>
              <Link to="/series">
                <img src="/images/series-icon.svg" alt="SERIES" />
                <span>SERIES</span>
              </Link>
            </NavMenu>
            <SignOut>
              <UserImg src={user.photoURL || "/images/netflix-profile.jpg"} alt={user.displayName || "User"} />
              <DropDown>
                <span onClick={handleAuth}>Sign out</span>
              </DropDown>
            </SignOut>
          </>
        )}
      </Menu>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  z-index: 3;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Logo = styled.a`
  width: 80px;

  img {
    width: 100%;
  }
`;

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Menu = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    margin: 10px 0;
    text-decoration: none;
    padding: 10px 0;
    color: white;

    img {
      height: 20px;
      margin-right: 5px;
    }

    span {
      color: white;
      font-size: 14px;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    width: auto;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const UserImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const SignOut = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropDown = styled.div`
  position: absolute;
  top: 50px;
  background: #090b13;
  padding: 10px;
  border-radius: 4px;
  display: none;

  ${SignOut}:hover & {
    display: block;
  }
`;

export default Header;
