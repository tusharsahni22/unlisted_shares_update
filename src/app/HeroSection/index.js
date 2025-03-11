'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroContainer = styled.section`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(26, 35, 126, 0.9), rgba(26, 35, 126, 0.7));
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  color: #fff;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled.button`
  display: inline-block;
  background-color: #f9a825;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f57f17;
  }
`;

// Fallback background color in case image fails to load
const FallbackBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #1a237e, #283593);
  z-index: -2;
`;

const Hero = () => {
  const router = useRouter();
  
  return (
    <HeroContainer>
      <FallbackBackground />
      <HeroBackground>
        <Image 
          src="/Chennai-new.jpg" 
          alt="CSK Stadium" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
          onError={(e) => {
            console.error('Image failed to load:', e);
            // Hide the image on error
            e.currentTarget.style.display = 'none';
          }}
        />
      </HeroBackground>
      <HeroContent>
        <HeroTitle>Chennai Super Kings Unlisted Shares</HeroTitle>
        <HeroSubtitle>
          Invest in one of the most successful and valuable IPL franchises with a loyal fanbase and consistent performance.
        </HeroSubtitle>
        <HeroButton onClick={() => router.push('/contact')}>Express Interest</HeroButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero; 