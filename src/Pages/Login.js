import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  
const [userRole, setUserRole] = useState(null);
const [errorRole, setErrorRole] = useState(false);
 // Проверка роли пользователя и блокирование доступа
 useEffect(() => {
  const fetchUserRole = async () => {
    try {
      const res = await axios.get("http://localhost:8000/me", { withCredentials: true });
      setUserRole(res.data[0]?.role);
    } catch (err) {
      console.log(err);
      setErrorRole(true); // Устанавливаем флаг ошибки, если не удалось получить роль пользователя
    }
  };
  fetchUserRole();
}, []);

if (!errorRole) {
  navigate("/")
}


  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    try {
      const response = await axios.post('/auth/jwt/login', formData);
      localStorage.setItem('token', response.data.access_token);
      window.location.reload();
      // navigate("/");
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return ( 
    <div className="login-form">
      <h2>Страница авторизации</h2>
      <form action="#" onSubmit={handleLogin}>
        <div className="input-box">
          <input
            type="text"
            placeholder='Логин'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder='Пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-box button">
          <input type="submit" value="Войти"/>
        </div>
      </form>
    </div>
  );
};

export default Profile;
