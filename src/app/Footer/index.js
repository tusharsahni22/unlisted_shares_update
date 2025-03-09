'use-client'
import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
background-color: #1a237e;
color: #fff;
padding: 2rem 0;
margin-top: 2rem;
`;

const FooterContent = styled.div`
max-width: 1200px;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: 2rem;
padding: 0 1rem;
`;

const FooterSection = styled.div`
display: flex;
flex-direction: column;
`;

const FooterTitle = styled.h3`
font-size: 1.2rem;
margin-bottom: 1rem;
color: #f9a825;
`;

const FooterLink = styled.a`
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
transition: color 0.3s ease;

&:hover {
  color: #f9a825;
}
`;

const FooterText = styled.p`
margin-bottom: 0.5rem;
`;

const Copyright = styled.div`
text-align: center;
padding-top: 2rem;
border-top: 1px solid rgba(255, 255, 255, 0.1);
margin-top: 2rem;
max-width: 1200px;
margin-left: auto;
margin-right: auto;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About CSK Shares</FooterTitle>
          <FooterText>
            Chennai Super Kings (CSK) is one of the most iconic and successful franchises in the Indian Premier League (IPL).
          </FooterText>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
            <FooterLink>Home</FooterLink>
            <FooterLink>About</FooterLink>
            <FooterLink>Contact</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>Email: info@cskshares.com</FooterText>
          <FooterText>Phone: +91 1234567890</FooterText>
        </FooterSection>
      </FooterContent>
      <Copyright>
        <FooterText>&copy; {new Date().getFullYear()} CSK Shares. All rights reserved.</FooterText>
      </Copyright>
    </FooterContainer>
  )
}

export default Footer