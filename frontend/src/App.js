import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import { Home, Watch, Login, Signup, Profile, EditProfile, NotFound, Search, Upload } from 'pages';
import NavBar from 'components/Navbar';
import Layout from 'components/Layout';
import GlobalStyle from 'globalStyle';
import Footer from 'components/Footer';
import AuthContext from 'context/AuthContext';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
            <Route path="/upload" exact>
              <Upload />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <Signup />
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
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
