import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Movies'));
        const fetchedList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMovies(fetchedList);
        setFilteredMovies(fetchedList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const filteredList = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filteredList);
  }, [searchTerm, movies]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
        <SearchInput
          type="text"
          placeholder="Search by title, character, or genre"
          value={searchTerm}
          onChange={handleSearch}
        />
      {filteredMovies.length > 0 ? (
        <Content>
          {filteredMovies.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={`/detail/` + movie.id}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))}
        </Content>
      ) : (
        <NoResultsMessage>No results found</NoResultsMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 72px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const SearchBar = styled.div`
  background: #333;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
 
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #fff;
  color: #333;
  width: 100%;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  &::placeholder {
    color: #999;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
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

const NoResultsMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #555;
`;

export default Search;
