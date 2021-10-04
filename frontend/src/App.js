import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import { Home, Watch, Login, Signup, Profile, EditProfile, NotFound, Search, Upload } from 'pages';
import NavBar from 'components/Navbar';
import Layout from 'components/Layout';
import GlobalStyle from 'globalStyle';
import Footer from 'components/Footer';
import AuthContext from 'context/AuthContext';
import ProtectedRoute from 'common/ProtectedRoute';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('/apis/root/login')
      .then(({ data }) => {
        const { isLoggedIn: serverData } = data;
        setIsLoggedIn(serverData);
      })
      .catch((e) => {
        setError(e);
      })
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
          <GlobalStyle />
          <NavBar />
          <Layout>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/watch/:id" exact>
                <Watch />
              </Route>
              <Route path="/search" exact>
                <Search />
              </Route>
              <ProtectedRoute path="/login" exact component={Login} />
              <ProtectedRoute path="/signup" exact component={Signup} />
              <Route path="/upload" exact>
                <Upload />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route path="/profile/:id" exact>
                <Profile />
              </Route>
              <Route path="/edit-profile/:id" exact>
                <EditProfile />
              </Route>
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
