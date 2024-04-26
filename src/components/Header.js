import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Main from '../Pages/Main';
import Login from '../Pages/Login';
import Logout from '../Pages/Logout';
import Contacts from '../Pages/Contacts';
import AdminPanel from '../Pages/AdminPanel';
import AddItem from "../Pages/Items/AddItem";
import Update from "../Pages/Items/UpdateItem";
import AddImage from "../Pages/Items/AddImage";

import AddBrand from "../Pages/Brands/AddBrand";
import Brands from "../Pages/Brands/Brands";
import UpdateBrand from "../Pages/Brands/UpdateBrand";

import Categories from "../Pages/Categories/Categories";
import AddCategory from "../Pages/Categories/AddCategory";
import UpdateCategories from '../Pages/Categories/UpdateCategories';
import ManagerComponent from "../components/ManagerComponent";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/me');
        setIsLoggedIn(response.status === 200);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/auth/jwt/logout');
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error);
    }
  };

  return (
    <header>
      <ManagerComponent/>
      <Router>
        <div className='nav'>
          <span className='logo'>Shop</span>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          {isLoggedIn ? (
            <NavLink to="/logout">Выйти</NavLink>
          ) : (
            <NavLink to="/login">Войти</NavLink>
          )}
          <NavLink to="/admin">Панель админа</NavLink>
        </div>
        
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/contacts" element={<Contacts />} />
          <Route exact path="/admin" element={<AdminPanel />} />

          <Route exact path="/brands" element={<Brands />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/add" element={<AddItem />} />
          <Route exact path="/brands/add" element={<AddBrand />} />
          <Route exact path="/categories/add" element={<AddCategory />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/brands/update/:id" element={<UpdateBrand />} />
          <Route exact path="/categories/update/:id" element={<UpdateCategories />} />
          <Route exact path="/images/add/:id" element={<AddImage />} />
        </Routes>
      </Router>
    </header>
  );
};

export default Header;
