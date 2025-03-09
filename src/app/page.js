'use client'
import React from 'react'
import styled from 'styled-components';
import Homepage from './Homepage';

const Wrapper = styled.div`
/* background-color:black; */
`;

function HomePage() {
  return (
    <Wrapper>
      <Homepage/>
    </Wrapper>
  )
}

export default HomePage