import styled from 'styled-components'

const Footer = () => {

	return (
		<StyledFooter>
			<Wrapper>
				<StyledLogo src="/images/logo.svg" alt="Disney+"></StyledLogo>
				<StyledParagraph>
                
 Disney+ is a paid subscription service, and its content is subject to availability.
 The Disney+ service is marketed by Disney DTC LATAM, Inc., 2400 W Alameda Ave., Burbank, CA 91521.
 © Disney. All rights reserved.  
				</StyledParagraph>
              
			</Wrapper>
		</StyledFooter>
	)
}



const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  background-color: #030408;
  margin-top: 70px;
  margin-bottom:auto;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #030408;
`;

const StyledLogo = styled.img`
  height: 50px;
`;

const StyledParagraph = styled.p`
font-size: 11px;
letter-spacing: 1.5px;
text-align: center;
line-height: 1.5;
`;
export default Footer