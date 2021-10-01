import React from 'react';
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
import { Home, Watch, Login, Signup, Profile, EditProfile, NotFound } from 'pages';
import NavBar from 'components/Navbar';
import Layout from 'components/Layout';
import GlobalStyle from 'globalStyle';

function App() {
  return (
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
            <Watch />
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
    </Router>
  );
}

export default App;
