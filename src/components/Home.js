import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Originals from "./Originals_Slider";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import NewDisney from "./Movies_Slider";
import db from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import { setMovies } from "../features/movie/movieSliec";
import { selectUserName } from "../features/user/UserSliec";
import { Timestamp } from "firebase/firestore"; 


const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const q = collection(db, "Movies");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trending = [];

      querySnapshot.docs.forEach((doc) => {
        const movieData = doc.data();


        const formattedData = {
          ...movieData,
          id: doc.id,
          timestamp:
            movieData.timestamp instanceof Timestamp
              ? movieData.timestamp.toMillis()
              : movieData.timestamp,
        };

        switch (formattedData.type) {
          case "recommend":
            recommends.push(formattedData);
            break;
          case "new":
            newDisneys.push(formattedData);
            break;
          case "original":
            originals.push(formattedData);
            break;
          case "trending":
            trending.push(formattedData);
            break;
          default:
            break;
        }
      });


      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });

    return () => unsubscribe();
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: absolute;
  top: 72px;
  margin-bottom: auto;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
