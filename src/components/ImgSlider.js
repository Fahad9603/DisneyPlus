import React,{useEffect} from 'react'
import db from '../firebase.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: dots => (
      <DotsContainer>
        <ul> {dots} </ul>
      </DotsContainer>
    ),
  };
  
const [images, setImages] = useState([]);
  useEffect(() => {
  
    const fetchSlider = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Slider_Image'));
        const fetchedImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImages(fetchedImages);
        console.log(setImages,fetchedImages)
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      };
fetchSlider(); 
}, [])

  return (
    <Carousel {...settings}>
    
       {images.map(image => (
        <Wrap key={image.id}>
          <a>
            <img src={image.img} alt="" />
          </a>
          
        </Wrap>
        
      ))}  
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  margin-top: 20px;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;
const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: right;

  ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin: 0 5px;
  }

  button {
    background: transparent;
    border: none;

    &:before {
      font-size: 10px;
      color: white;
      opacity: 0.75;
    }

    &:hover:before {
      opacity: 1;
    }
  }

  .slick-active button:before {
    opacity: 1;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;