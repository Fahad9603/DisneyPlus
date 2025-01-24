import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled as styledMUI } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import db from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReactPlayer from 'react-player';

const SeriesEpisode = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const docRef = doc(db, 'Series', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovie({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching movie: ", error);
      }
    };
    fetchMovie();
  }, [id]);

  const backToPreviousPageHandler = () => {
    history.goBack();
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StyledIconButton className='back' variant='outlined' onClick={backToPreviousPageHandler}>
        <ArrowBackIosNewRoundedIcon />
      </StyledIconButton>
      <Background>
        <img src={movie.backgroundImg} alt={movie.title} />
      </Background>
      <ImageTitle>
        <img src={movie.titleImg} alt={movie.title} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
        </Controls>
        <SubTitle>{movie.subTitle}</SubTitle>
        <Description>{movie.description}</Description>
      </ContentMeta>
      <Episodes>
        <h4>Episodes</h4>
        {movie.episodes && movie.episodes.length > 0 ? (
          movie.episodes.map((episode, index) => (
            <EpisodeCard key={index} onClick={() => setSelectedEpisode(episode)}>
              <h5>{episode.title}</h5>
              <p>{episode.description}</p>
            </EpisodeCard>
          ))
        ) : (
          Array.from({ length: 4 }, (_, index) => (
            <PlaceholderCard key={index}>
              <h5>Episode Title</h5>
              <p>Description not available.</p>
            </PlaceholderCard>
          ))
        )}
      </Episodes>
      
      {selectedEpisode && (
        
        <VideoPlayerContainer>
          <ReactPlayer url={selectedEpisode.url} controls playing />
        </VideoPlayerContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 72px);
  padding: 0 calc(3.5vw + 5px);
  overflow-x: hidden;
  display: block;
  top: 72px;
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
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

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);
  img {
    width: 32px;
  }
  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  text-transform: uppercase;
`;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
`;

const Episodes = styled.div`
  margin-top: 20px;
  h4 {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const EpisodeCard = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid rgba(249, 249, 249, 0.1);
  border-radius: 5px;
  cursor: pointer;
  h5 {
    margin: 0;
    font-size: 18px;
  }
  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: rgba(249, 249, 249, 0.8);
  }
  &:hover {
    background: rgba(249, 249, 249, 0.1);
  }
`;

const PlaceholderCard = styled(EpisodeCard)`
  h5 {
    color: rgba(249, 249, 249, 0.6);
  }
  p {
    color: rgba(249, 249, 249, 0.4);
  }
`;

const VideoPlayerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  video {
    width: 80%;
    height: auto;
  }
`;

export default SeriesEpisode;
