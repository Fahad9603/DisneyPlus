import React from 'react'
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Search from './components/Search'
import Wishlist from './components/WishList';
import Series from './components/Series';
import SeriesEpisode from './components/SeriesEpisode';
import Movies from './components/Movies';
import Originals from './components/Originals';
import Detail from './components/Detail';
import Login from './components/Login';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
 
  

  return (
    <div className="App">
      <Router>
       
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/originals">
            <Originals />
          </Route>
          <Route path="/wishlist">
            <Wishlist />
          </Route>
          <Route path="/series">
            <Series />
          </Route>
          <Route path="/seriesepisode/:id">
            <SeriesEpisode />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
       
      {/* <Footer /> */}
      </Router>
    </div>
    
  );
}

export default App;
