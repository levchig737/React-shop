import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';


export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: ''
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
  
    // Создаем объект FormData для отправки данных в формате form-data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    // Отправляем запрос на эндпоинт '/auth/jwt/login'
    axios.post('/auth/jwt/login', formData)
      .then((response) => {
        // Обработка успешного ответа
        // Если эндпоинт возвращает JWT токен, сохраните его для дальнейшего использования
        localStorage.setItem('token', response.data.access_token);
        // Вы можете добавить переадресацию на другую страницу или обновление состояния
        this.setState({ role: 'user' }); // Пример обновления состояния
      })
      .catch((error) => {
        // Обработка ошибок
        console.error('Ошибка при авторизации:', error);
      });
  };

  render() {
    const { username, password, role } = this.state;
    return ( 
     <div class="login-form">
       <h2>Страница авторизации</h2>
        <form action="#" onSubmit={this.handleLogin}>
        <div class="input-box">
        <input
              type="text"
              placeholder='Логин'
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
        </div>
        <div class="input-box">
        <input
              type="password"
              placeholder='Пароль'
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              />
        </div>
        <div class="input-box button">
        <input type="Submit" value="Войти"/>
        </div>
        </form>
      </div>
    );
  }
}

export default Profile