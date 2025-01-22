import React from 'react'
import{useHistory  } from 'react-router-dom'
import styled from 'styled-components'

const Player = ({ url, setMoviePlayer }) => {
    const history = useHistory ();
    const handleClick = () => {
        history.goBack();
      };
    return (
        <StyledContainer>
            <StyleBackground onClick={() => setMoviePlayer(false)}>
               
                <img src='/images/back_arrow_icon.png' alt='' onClick={handleClick}></img>
                <StyledTrailer>
                    <iframe 
                        src={`${url}`}
                        
                        title="YouTube video player" 
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; language; gyroscope; picture-in-picture" 
                        allowFullScreen
                    >
        
                    </iframe>
                    
                </StyledTrailer>
            </StyleBackground>
        </StyledContainer>

        
        
    )

}


const StyledContainer = styled.div`
    position: relative;
    /* height: 100vh;
    width: 100vw; */
`

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

    img{
        position: absolute;
top: 20px;
left: 20px;
width:50px;
cursor:pointer;
    }
`


const StyledTrailer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    z-index: 200;

    iframe {
        width: 90%;
        max-width: 90%;
        height: 515px;
    }
`

export default TrailerPopup