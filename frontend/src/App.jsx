// import React from 'react';

import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeAllUsers } from './reducers/userReducer';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Menu2 from './components/Menu2';
import Products from './pages/Products';
import Reviews from './pages/Reviews';
import Videos from './pages/Videos';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import { initializeLoggedInUser, logOut } from './reducers/loginReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAllUsers());
    dispatch(initializeLoggedInUser());
  }, [dispatch]);

  const loggedInUser = useSelector((state) => state.loggedInUser);

  return (
    <>
      <Header></Header>
      {loggedInUser ? (
        <div>
          {loggedInUser.name} logged in
          <button className='btn' onClick={() => dispatch(logOut())}>
            Log Out
          </button>
        </div>
      ) : null}
      <Menu2></Menu2>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="/videos" element={<Videos />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/login"
          element={
            loggedInUser === null ? <Login /> : <Navigate replace to="/" />
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
