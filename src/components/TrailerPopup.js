import React from 'react'
import styled from 'styled-components'

const TrailerPopup = ({ url, setShowTrailer }) => {
    console.log(url)
    return (
        <StyledContainer>
            <StyleBackground onClick={() => setShowTrailer(false)}>
                <StyledTrailer>
                    <iframe 
                        src={`https://www.youtube.com/embed/'${url}`}
                        
                        title="YouTube video player" 
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
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
`

const StyledTrailer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    z-index: 200;

    iframe {
        width: 560px;
        max-width: 90%;
        height: 315px;
    }
`

export default TrailerPopup