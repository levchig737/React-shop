import React from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Login from '../Pages/Login';
import Main from '../Pages/Main';
import Contacts from '../Pages/Contacts';
import Other404 from '../Pages/Other404';
import AdminPanel from '../Pages/AdminPanel';

export default function Header() {
  return (
    <header>
      <Router>
      <div className='nav'>
        <span className='logo'>Shop</span>
        <NavLink to ="/">Главная</NavLink>
        <NavLink to ="/login">Войти</NavLink>
        <NavLink to ="/contacts">Контакты</NavLink>
        <NavLink to ="/adminPanel">Панель админа</NavLink>
      </div>
        

        <Routes>
          <Route exact path="/"  element = {<Main/>}/>
          <Route exact path="/login"  element = {<Login/>}/>
          <Route exact path="/contacts"  element = {<Contacts/>}/>
          <Route exact path="/adminPanel"  element = {<AdminPanel/>}/>
          {/* <Route  path="*" element = {<Other404/>}/> */}
        </Routes>

        </Router>
    </header>
  )
}
