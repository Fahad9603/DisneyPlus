import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { addPoints } from '../../src/components/PointsManager'; 

const Player = ({ url, setMoviePlayer }) => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };


  const getVideoId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  const videoId = getVideoId(url);

  const onVideoEnd = () => {
    addPoints(10); 
  };

  return (
    <StyledContainer>
      <StyleBackground onClick={() => setMoviePlayer(false)}>
        <img src='/images/back_arrow_icon.png' alt='' onClick={handleClick} />
        <StyledTrailer>
          <YouTube
            videoId={videoId}
            onEnd={onVideoEnd}
            opts={{
              height: '515',
              width: '90%',
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </StyledTrailer>
      </StyleBackground>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
`;

const StyleBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, .5);
  height: 100%;
  width: 100%;

  img {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 50px;
    cursor: pointer;
  }
`;

const StyledTrailer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  z-index: 200;
`;

export default Player;
