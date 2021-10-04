import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import { Home, Watch, Login, Signup, Profile, EditProfile, NotFound, Search, Upload } from 'pages';
import NavBar from 'components/Navbar';
import Layout from 'components/Layout';
import GlobalStyle from 'globalStyle';
import Footer from 'components/Footer';
import AuthContext from 'context/AuthContext';
import ProtectedRoute from 'common/onlyLoggedInRoute';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/apis/root/login')
      .then(({ data }) => {
        const { isLoggedIn: serverLoggedIn, userId: serverUserId } = data;
        setIsLoggedIn(serverLoggedIn);
        setUserId(serverUserId)
      })
      .catch((e) => {
        setError(e);
      })
  }, [isLoggedIn, userId]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId ,setUserId }}>
      <Router>
          <GlobalStyle />
          <NavBar />
          <Layout>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/watch/:id" exact component={Watch} />
              <Route path="/search" exact component={Search} />
              <ProtectedRoute path="/login" exact component={Login} />
              <ProtectedRoute path="/signup" exact component={Signup} />
              <Route path="/profile/:id" exact component={Profile} />
              <Route path="/upload" exact component={Upload} />
              <Route path="/edit-profile/:id" exact component={EditProfile} />
              <Route path="*" exact>
                <NotFound />
              </Route>
            </Switch>
          </Layout>
          <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
