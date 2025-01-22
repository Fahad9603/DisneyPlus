import React, { useRef, useEffect } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOriginal } from "../features/movie/movieSliec";

const Originals = (props) => {
  const movies = useSelector(selectOriginal);
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    };

    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <>
      <Container>
        <h4>Originals</h4>
        
        <Content ref={containerRef}>
          {movies &&
            movies.map((movie, key) => (
              <Wrap key={key}>
                {movie.id}
                <Link to={`/detail/` + movie.id}>
                  <img src={movie.cardImg} alt={movie.title} />
                </Link>
              </Wrap>
            ))}
        </Content>
   
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-auto-flow: column;
  grid-auto-columns: minmax(25%, 1fr);

  @media (max-width: 768px) {
    grid-auto-columns: minmax(50%, 1fr);
  }
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
   border-radius: 50%;
   justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    opacity: 1;
    transition: opacity 0.2s ease 0s;
  }
`;

const ButtonLeft = styled(Button)`
  left: 0;
`;

const ButtonRight = styled(Button)`
  right: 0;
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow-x: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Originals;
