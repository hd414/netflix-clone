import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import RowContainer from './containers/Row.container';
import TvShowContainer from './containers/TvShows.container';
import { IsProtectedPage, IsUserRedirect } from './helpers/routes';
import { UseAuthListener } from './hooks/use-auth-listener';
import { Home } from './pages/home';
import Search from './pages/search/Search';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/navbar.component';
import { SearchContext } from './context/search.context';
import { ProfileContext } from './context/profile.context';
import List from './pages/MyList/list';
import Context from './context/api.context';




function App() {
  const location = useLocation();
  const user = UseAuthListener();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(true);
  const [loading, setLoading] = useState(true);



  if (location.pathname === '/browse' || location.pathname === '/ResultPage' || location.pathname === '/ListPage' || location.pathname === '/tvShows') {
    return (
      <SearchContext.Provider value={{ searchQuery, setSearchQuery, loading, setLoading }}>
        <Context>
          {
            (showProfile || loading) ? null : <Navbar />
          }


          <Switch>

            <Route
              exact
              path="/browse"
              render={() => (
                <IsProtectedPage user={user} Path={'/'} exact>
                  <ProfileContext.Provider value={{ showProfile, setShowProfile, loading, setLoading }}>
                    <RowContainer />
                  </ProfileContext.Provider>
                </IsProtectedPage>
              )}
            />
            <Route
              exact
              path="/tvShows"
              render={() => (
                <IsProtectedPage user={user} Path={'/'} exact>
                  <TvShowContainer />
                </IsProtectedPage>
              )}
            />


            <Route
              exact
              path="/ResultPage"
              render={() => (<IsProtectedPage user={user} Path={'/'} exact><Search /></IsProtectedPage>)}
            />

            <Route
              exact
              path="/ListPage"
              render={() => (<IsProtectedPage user={user} Path={'/'} exact><List /></IsProtectedPage>)}
            />
          </Switch>
        </Context>
      </SearchContext.Provider>
    )
  }

  return (
    <>

      <Switch>
        <Route
          exact
          path="/"
          render={() => (<IsUserRedirect user={user} exact loggedInPath={'/browse'}><Home /></IsUserRedirect>)}
        />

        <Route
          exact
          path="/signin"
          render={() => (<IsUserRedirect user={user} exact loggedInPath={'/browse'}>
            <ProfileContext.Provider value={{ showProfile, setShowProfile, loading, setLoading }}>
              <Signin />
            </ProfileContext.Provider>
          </IsUserRedirect>)}
        />

        <Route
          exact
          path="/signup"
          render={() => (<IsUserRedirect user={user} exact loggedInPath={'/browse'}><Signup /></IsUserRedirect>)}
        />


      </Switch>


    </>
  );
}

export default App;
