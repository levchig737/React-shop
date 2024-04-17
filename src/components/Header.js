import React from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Login from '../Pages/Login';
import Main from '../Pages/Main';
import Contacts from '../Pages/Contacts';
import AdminPanel from '../Pages/AdminPanel';
import AddItem from "../Pages/Items/AddItem";
import AddBrand from "../Pages/AddBrand";
import Update from "../Pages/Items/UpdateItem";
import Brands from "../Pages/Brands";
import Categories from "../Pages/Categories";
import AddCategory from "../Pages/AddCategory";
import AddImage from "../Pages/Items/AddImage";


export default function Header() {
  return (
    <header>
      <Router>
      <div className='nav'>
        <span className='logo'>Shop</span>
        <NavLink to ="/">Главная</NavLink>
        <NavLink to ="/login">Войти</NavLink>
        <NavLink to ="/contacts">Контакты</NavLink>
        <NavLink to ="/admin">Панель админа</NavLink>
      </div>
        

        <Routes>
          <Route exact path="/"  element = {<Main/>}/>
          <Route exact path="/login"  element = {<Login/>}/>
          <Route exact path="/contacts"  element = {<Contacts/>}/>
          <Route exact path="/admin"  element = {<AdminPanel/>}/>

          <Route exact path="/brands" element={<Brands />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/add" element={<AddItem />} />
          <Route exact path="/brands/add" element={<AddBrand />} />
          <Route exact path="/categories/add" element={<AddCategory />} />
          <Route exact path="/update/:id" element={<Update />} />
          <Route exact path="/images/add/:id" element={<AddImage />} />
        </Routes>

        </Router>
    </header>
  )
}
