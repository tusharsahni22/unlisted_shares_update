import React from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
const Logo = styled.div`
  display: flex;
  align-items: center;
`
const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-left: 0.5rem;
`
const Nav = styled.div`
  display: flex;
`
const Image = styled.img`
  border-radius: 50%;
`

const NavLink = styled.a`
  margin-left: 1rem;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #0070f3;
  }
`;


function Header() {
  const router = useRouter();
  return (
    <HeaderContainer>
      <Logo onClick={() =>{router.push('/')}}>
        <Image src="https://cdn.prod.website-files.com/66dad9c594a45d74898a5fc6/66e9a5d287ad4d164a1788ae_70521baac89be4d4cb2f223bbf67c974%20(1).avif" alt="CSK Logo" width={40} height={40} />
        <LogoText>CSK Shares</LogoText>
      </Logo>
      <Nav>
          <NavLink onClick={() =>{router.push('/')}}>Home</NavLink>
          <NavLink>About</NavLink>
          <NavLink onClick={() =>{router.push('/contact')}}>Contact</NavLink>
      </Nav>
    </HeaderContainer>
  )
}

export default Header