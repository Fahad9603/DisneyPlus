import React from 'react'; 
import { BrowserRouter as Router, Route, Navigate, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from './features/auth/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import Wishlist from './components/WishList';
import Series from './components/Series';
import SeriesEpisode from './components/SeriesEpisode';
import Movies from './components/Movies';
import Originals from './components/Originals';
import Detail from './components/Detail';
import Login from './components/Login';
import SubscribePage from './components/Plan-Selection';
import SignUp from './components/signup';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <HeaderWrapper />
          <Routes>
            <Route path='/plan-selection' element={<SubscribePage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/originals" element={<ProtectedRoute><Originals /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/series" element={<ProtectedRoute><Series /></ProtectedRoute>} />
            <Route path="/seriesepisode/:id" element={<ProtectedRoute><SeriesEpisode /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
    </AuthProvider>
  );
}
  
function HeaderWrapper() {
  const location = useLocation();
  const noHeaderRoutes = ['/plan-selection', '/SignIn', '/signup']; 

  console.log("Current Path:", location.pathname); 

  if (noHeaderRoutes.includes(location.pathname.toLowerCase())) {
    return null; 
  }
  return <Header />;
}

export default App;
