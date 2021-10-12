import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, Watch, Login, Signup, Profile, EditProfile, NotFound, Search, Upload } from 'pages';
import NavBar from 'components/Navbar';
import Layout from 'components/Layout';
import GlobalStyle from 'globalStyle';
import Footer from 'components/Footer';
import AuthContext from 'context/AuthContext';
import ProtectedRoute from 'common/ProtectedRoute';
import ChangePassword from 'pages/ChangePassword';
import { backUrl } from 'config';
import { getLoginAsync } from 'modules/auth';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

function App() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginAsync());
  }, [dispatch]);
  
  return (
    <>
      <Router>
        <GlobalStyle />
        <NavBar />
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/watch/:id" exact component={Watch} />
            <Route path="/search" exact component={Search} />
            <ProtectedRoute path="/login" exact component={Login} isLoggedIn={isLoggedIn}/>
            <ProtectedRoute path="/signup" exact component={Signup} isLoggedIn={isLoggedIn}/>
            <ProtectedRoute path="/profile/:id" exact component={Profile} isLoggedIn={!isLoggedIn}/>
            <ProtectedRoute path="/upload" exact component={Upload} isLoggedIn={!isLoggedIn}/>
            <ProtectedRoute path="/edit-profile" exact component={EditProfile} isLoggedIn={!isLoggedIn}/>
            <ProtectedRoute path="/change-password" exact component={ChangePassword} isLoggedIn={!isLoggedIn}/>
            <Route path="*" exact>
              <NotFound />
            </Route>
          </Switch>
        </Layout>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
