import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { background, red, white, black } from 'styles/color';
import { Container } from 'styles/common';
import { Button } from 'components/common';
import AuthContext from 'context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { getLogout } from 'modules/auth';


const Nav = styled.nav`
  flex: 1; 
  width: 100%;
  background-color: ${background};
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
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
  const history = useHistory();
  const dispatch = useDispatch();
  const [openHamburger, setOpenHamburger] = useState(false);
  const { isLoggedIn , userId } = useSelector((state) => state.auth);

  const  handleOpenHamburger =  useCallback(() => {
    setOpenHamburger(prev => !prev);
  },[]);

  const Logout = useCallback(() => {
    dispatch(getLogout()).then(res => {
      console.log(res);
      history.push('/');
    });
  }, [dispatch, history]);
  
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
          {isLoggedIn ? (
            <>
              <NavMenuItem>
                <Link to="/upload">UPLOAD</Link>
              </NavMenuItem>
              <NavMenuItem>
                <Link to={`/profile/${userId}`}>PROFILE</Link>
              </NavMenuItem>
              <NavMenuItem onClick={Logout}>
                LOGOUT
              </NavMenuItem>
            </>
          ) : (
            <>
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
            </>
          )}
        </NavMenu>
      </NavContainer>
    </Nav>
  )
}

export default Navbar;
