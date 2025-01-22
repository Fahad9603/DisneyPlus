import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'WishList'));
        const fetchedWishList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWishlist(fetchedWishList);
      
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <Container>
      <h4>My Wishlist</h4>
      <Content>
      {wishlist.length > 0 ? (
          wishlist.map(wishlists => (
            <Wrap key={wishlists.movieId}>
              <Link to={`/detail/${wishlists.movieId}`}>
                <img src={wishlists.cardImg} alt={wishlists.title} />
              </Link>
            </Wrap>
          )
        )
        ) : (
          <p>No items in wishlist</p>
        )}
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
    background: url('/images/home-background.png') center center / cover
      no-repeat fixed;
    content: '';
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

export default Wishlist;
