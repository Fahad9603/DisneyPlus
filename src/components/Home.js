import React,{useEffect} from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import Originals from "./Originals_Slider";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from './Viewers'
import NewDisney   from "./Movies_Slider";
import db from '../firebase'
import {useDispatch,useSelector} from 'react-redux'
import { onSnapshot, collection } from "firebase/firestore";
import {setMovies,selectMovies} from '../features/movie/movieSliec';
import { selectUserName } from "../features/user/UserSliec";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

useEffect(() => {
    const q = collection(db, "Movies");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempMovies = querySnapshot.docs.map((doc) => {
        
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            break;

          case "new":
            newDisneys  = [...newDisneys , { id: doc.id, ...doc.data() }];
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            break;
        }
      });
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney : newDisneys ,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [userName]);

   
    return (
        <Container>
            <ImgSlider />
            <Viewers />
            <Recommends />
      <NewDisney  />
      <Originals />
      <Trending />
        </Container>
    )
};


const Container = styled.main`
position: relative;
min-height: calc(100vh - 250px);
overflow-x: hidden;
display: absolute;
top:72px;
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

export default Home