import React from "react";
import styled, { keyframes } from "styled-components"


const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderContainer>
        <LoaderArc color="#475569" />
        <InnerArc color="#f9f9f9" />
        <CoreArc color="#007bff" />
      </LoaderContainer>
    </LoaderWrapper>
  )
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: -9px 9px 9px rgba(0, 0, 0, 264);;
`

export const LoaderContainer = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  animation: ${rotate} 3s linear infinite;
`

export const LoaderArc = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 8px solid transparent;
  border-radius: 50%;
  border-top-color: ${(props) => props.color};
  border-left-color: ${(props) => props.color};
`

export const InnerArc = styled(LoaderArc)`
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  animation: ${rotate} 2s linear infinite reverse;
`

export const CoreArc = styled(LoaderArc)`
  width: 20%;
  height: 20%;
  top: 40%;
  left: 40%;
  animation: ${rotate} 1s linear infinite;
`
export default Loader