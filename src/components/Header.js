import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  // Close the menu if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('nav') && !event.target.closest('.sidebar')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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

  if (!isVisible) return null;

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </MenuToggle>
      <Sidebar open={menuOpen}>
        <CloseButton onClick={() => setMenuOpen(false)}>×</CloseButton>
        {!user ? (
          <Login onClick={handleAuth}>Login</Login>
        ) : (
          <>
            <NavMenu>
              <Link to="/home" onClick={() => setMenuOpen(false)}>
                <img src="/images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
              </Link>
              <Link to="/search" onClick={() => setMenuOpen(false)}>
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </Link>
              <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>WATCHLIST</span>
              </Link>
              <Link to="/originals" onClick={() => setMenuOpen(false)}>
                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
              </Link>
              <Link to="/movies" onClick={() => setMenuOpen(false)}>
                <img src="/images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
              </Link>
              <Link to="/series" onClick={() => setMenuOpen(false)}>
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
      </Sidebar>
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
  transition: padding 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const Logo = styled.a`
  width: 80px;

  img {
    width: 100%;
  }
`;

const MenuToggle = styled.div`
  display: block;
  cursor: pointer;
  font-size: 24px;
  color: white;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? '0' : '-250px')};
  width: 250px;
  height: 100%;
  background-color: #090b13;
  transition: left 0.3s ease-in-out;
  padding: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 769px) {
    left: 0;
    width: auto;
    height: auto;
    background: none;
    position: static;
    padding: 0;
    flex-direction: row;
    align-items: center;
  }
`;


const CloseButton = styled.div`
  font-size: 30px;
  color: white;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ;  
  width: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 13px 0;
    text-decoration: none;
    color: white;
    transition: background 0.3s ease;

    &:hover {
      span:after {
                transform: scaleX(1);
                opacity: 1;
            }
    }

    img {
      height: 24px;
      margin-right: 10px;
    }

    span {
       font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0; 
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
    }
  }

  @media (min-width: 769px) {
    flex-direction: row;
    width: auto;

    a {
      padding: 15px 12px;
    }
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
  cursor: pointer;
  border: 2px solid white;
`;

const SignOut = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;

  @media (min-width: 769px) {
    margin-top: 0;
    margin-left: 20px;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: #090b13;
  padding: 10px;
  border-radius: 4px;
  display: none;

  ${SignOut}:hover & {
    display: block;
  }
`;

export default Header;
