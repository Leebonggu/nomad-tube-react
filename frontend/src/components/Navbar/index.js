import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { background, red, white, black } from 'styles/color';
import { Container } from 'styles/common';
import { Button } from 'components/common';


const Nav = styled.nav`
  width: 100%;
  background-color: ${background};
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  font-size: 1.5rem;
  top: 0;
  z-index: 999;

  &:hover {
    color: ${red};
  }
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
`;

const NavLogo = styled(Link)`
display: flex;
align-items: center;
  color: ${white};
  text-decoration: none;
  &:hover {
    color: ${red};
  }
`;

const HamburgerIconContainer = styled.div`
  display: none;
  @media screen and (max-width: 992px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    cursor: pointer;
    transform: translate(-100%, 70%);
    color: ${white};
  }
`;
const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  text-decoration: none;
  list-style: none;
  font-size: 1rem;
  color: ${white};
  
  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    position: absolute;
    top: 90px;
    height: 100vh;
    left: ${({ openHamburger }) => (openHamburger ? '0px' : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: ${black};
  }

`;
const NavMenuItem = styled.li`
  margin-right: 1rem;
  cursor: pointer;

  a {
    text-decoration: none;
    color: ${white};
    &:hover {
    color: ${red};
    }
  }

  @media screen and (max-width: 992px) {
    height: 80px;
    font-size: 1.5rem;
  }
`;

function Navbar() {
  const [openHamburger, setOpenHamburger] = useState(false);

  const  handleOpenHamburger =  useCallback(() => {
    setOpenHamburger(prev => !prev);
  },[]);
  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">YOUTUBE</NavLogo>
        <HamburgerIconContainer onClick={handleOpenHamburger}>
          {openHamburger ? <FaTimes /> : <FaBars />}
        </HamburgerIconContainer>
        <NavMenu onClick={handleOpenHamburger} openHamburger={openHamburger}>
          <NavMenuItem>
            <Link to="/search">SEARCH</Link>
          </NavMenuItem>
          <NavMenuItem>
            <Link to="/upload">UPLOAD</Link>
          </NavMenuItem>
          <NavMenuItem>
            <Link to="/profile">PROFILE</Link>
          </NavMenuItem>
          <NavMenuItem>
            <Link to="/login">LOGIN</Link>
          </NavMenuItem>
          <NavMenuItem>
            <Link to="/signup">
              <Button>
                SINGUP
              </Button>
            </Link>
          </NavMenuItem>
        </NavMenu>
      </NavContainer>
    </Nav>
  )
}

export default Navbar;
