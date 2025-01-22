import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [movieTypes, setMovieTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchMoviesList = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Movies'));
                const fetchedMoviesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMovies(fetchedMoviesList);

                const types = [...new Set(fetchedMoviesList.map(movie => movie.MovieType).filter(type => type))];
                setMovieTypes(types);
            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        };
        fetchMoviesList();
    }, []);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const filteredMovies = selectedType ? movies.filter(movie => movie.MovieType === selectedType) : movies;

    return (
        <Container>
            <h4>Movies Disney Plus</h4>
            <StyledTitle>Select your favorite Movies category  &nbsp;
                <StyledSelect id='category-selection' value={selectedType} onChange={handleTypeChange} className='select'>
                <option value="">Genres</option>
                    {movieTypes.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </StyledSelect>
                </StyledTitle>
            <Content>
                {filteredMovies.map((movie, key) => (
                    <Wrap key={key}>
                        {movie.id}
                        <Link to={`/detail/${movie.id}`}>
                            <img src={movie.cardImg} alt={movie.title} />
                        </Link>
                    </Wrap>
                ))}
            </Content>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 72px);
    overflow-x: hidden;
    display: block;
    top: 60px;
    margin-bottom: auto;
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

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const StyledTitle = styled.div`
margin: 10px 0;
	display: flex;
	align-items: center;   
text-align: left;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 30px;

    @media (min-width: 600px) {
        font-size: 20px;
    }

    @media (min-width: 800px) {
        font-size: 25px;
    }
`;

const StyledSelect = styled.select`
    width: 200px;
    cursor: pointer;
    padding: 10px 20px;
    appearance: none;
    text-align-last: center;
    -webkit-appearance: none;
    border-radius: 50px;
    background-color: rgb(49, 51, 60);
    color: rgb(249, 249, 249);
    outline: none;
    transition: border 0.3s, background-color 0.3s;

    &:hover {
        background-color: rgba(49, 51, 60, 0.7);
    }

    &.select {
        background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%),
            linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 20px) calc(10px + 5px), calc(100% - 15px) calc(10px + 5px), calc(100% - 30px) 10px;
        background-size: 5px 5px, 5px 5px, 1px 15px;
        background-repeat: no-repeat;
    }

    option {
        padding: 10px;
    }
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

export default Movies;
