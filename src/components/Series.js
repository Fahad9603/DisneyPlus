import React from 'react';
import styled from 'styled-components';

const Series  = () => {
 
    

  return (
    <Container>
      <h4>Series Disney Plus</h4>
     <Content>
        <h1>Coming Soon.......</h1>
      </Content>
    </Container>
  );
};
const Container = styled.div`
position: relative;
min-height: calc(100vh - 72px);
overflow-x: hidden;
display: block;
top: 72px;
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

const Content = styled.div`
display: grid;
grid-gap: 25px;
grid-template-columns: repeat(4, minmax(0,1fr));

`;
export default Series;