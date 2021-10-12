import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { subBackgroud } from 'styles/color';
import { Container } from 'styles/common';
import Footer from 'components/Footer';
import { Header } from 'antd/lib/layout/layout';
import Navbar from 'components/Navbar';

const LayoutContainer = styled(Container)`
  min-height: 100%;
  position: relative;
  margin-top: 8rem;
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
