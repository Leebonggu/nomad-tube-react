import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { subBackgroud } from 'styles/color';
import { Container } from 'styles/common';
import Footer from 'components/Footer';

const LayoutContainer = styled(Container)`
  /* display: flex;
  flex-direction: column; */
  height: 100%;
  flex: 8;
  display: box;
`;

function Layout({ children }) {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
