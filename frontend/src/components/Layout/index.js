import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { subBackgroud } from 'styles/color';
import { Container } from 'styles/common';

const LayoutContainer = styled(Container)`
  /* width: 100%; */
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
