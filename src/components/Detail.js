import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { styled as styledMUI } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import db from '../firebase.js';
import { doc, getDoc, collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import TrailerPopup from "./TrailerPopup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const history = useHistory();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const docRef = doc(db, "Movies", id);
        const docSnap = await getDoc(docRef);
        if (docSnap && docSnap.exists()) {
          setDetailData(docSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();

    const checkWishlist = async () => {
      try {
        const q = query(collection(db, "WishList"), where("movieId", "==", id));
        const querySnapshot = await getDocs(q);
        setIsInWishlist(!querySnapshot.empty);
      } catch (error) {
        console.error(error);
      }
    };
    checkWishlist();
  }, [id]);

  const addToWishList = async () => {
    try {
      const wishListRef = collection(db, "WishList");
      await addDoc(wishListRef, {
        movieId: id,
        title: detailData.title,
        backgroundImg: detailData.backgroundImg,
        titleImg: detailData.titleImg,
        subTitle: detailData.subTitle,
        description: detailData.description,
        cardImg: detailData.cardImg,
        trailer: detailData.trailer,
        type: detailData.type
      });
      setIsInWishlist(true);
      toast.success("Added to wishlist successfully!");
    } catch (error) {
      toast.error("Failed to add to wishlist. Please try again.");
    }
  };

  const removeFromWishList = async () => {
    try {
      const q = query(collection(db, "WishList"), where("movieId", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setIsInWishlist(false);
      toast.success("Removed from wishlist successfully!");
    } catch (error) {
      toast.error("Failed to remove from wishlist. Please try again.");
    }
  };

  const backToPreviousPageHandler = () => {
    history.goBack();
  };

  return (
    <>
      <ToastContainer />
      {showTrailer && 
        <TrailerPopup 
          url={detailData.trailer}
          setShowTrailer={setShowTrailer}
        />
      }
      {showMovie && 
        <TrailerPopup 
          url={detailData.trailer}
          setShowMovie={setShowMovie}
        />
      }
      <StyledContainer>
        <StyledIconButton className='back' variant='outlined' onClick={backToPreviousPageHandler}>
          <ArrowBackIosNewRoundedIcon />
        </StyledIconButton>
        <StyledBackground style={{ backgroundImage: `url(${detailData.backgroundImg})` }} />
        <StyledImageTitle>
          <img src={detailData.titleImg} alt={detailData.title} />
        </StyledImageTitle>
        <StyledMeta>
          <StyledControls>
            <StyledPlayer onClick={() => setShowTrailer(true)}>
              <img src="/images/play-icon-black.png" alt="play-icon-black" />
              <span>Play</span>
            </StyledPlayer>
            <StyledTrailer onClick={() => setShowTrailer(true)}>
              <img src="/images/play-icon-white.png" alt="play-icon-white" />
              <span>Trailer</span>
            </StyledTrailer>
            {isInWishlist ? (
              <StyledIconButton className='remove' variant='outlined' onClick={removeFromWishList}>
                <DoneRoundedIcon />
              </StyledIconButton>
            ) : (
              <StyledIconButton className='add' variant='outlined' onClick={addToWishList}>
                <AddRoundedIcon />
              </StyledIconButton>
            )}
          </StyledControls>
          <StyledSubTitle>{detailData.subTitle}</StyledSubTitle>
          <StyledDescription>{detailData.description}</StyledDescription>
        </StyledMeta>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 70px);
  height: 100%;
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  overflow: hidden;
`;
const StyledIconButton = styledMUI(IconButton)({
  color: '#F9F6EE',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderColor: '#F9F6EE',
  transition: 'background-color 0.3s',

  '&.back': {
    marginTop: '25px',
  },

  '&:hover': {
    backgroundColor: '#000',
  },
});
const StyledBackground = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0;
  opacity: 0.8;
  z-index: -4;
  background-position: top right;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  height: 100%;
  width: 100vw;
`;

const StyledImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  height: 25vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 500px;
    min-width: 200px;
    width: 35vw;
  }
`;

const StyledMeta = styled.div`
  max-width: 874px;
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const StyledPlayer = styled.button`
  margin: 0px 22px 0px 0px;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;

  span {
    font-size: 15px;
    letter-spacing: 1.8px;
    color: #000;
  }

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    margin: 0px 0px 0px 10px;

    img {
      width: 25px;
    }
  }
`;

const StyledTrailer = styled(StyledPlayer)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);

  span {
    color: rgb(249, 249, 249);
  }

  &:hover {
    background: #111;
  }
`;

const StyledSubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const StyledDescription = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;
