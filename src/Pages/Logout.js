import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

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

    useEffect(() => {
        const logout = async () => {
        try {
            await axios.post('/auth/jwt/logout');
            window.location.reload();
            // navigate("/")
        } catch (err) {
            console.log(err);
        }
        };
        logout();
    }, []);

    
if (!errorRole) {
    navigate("/")
  }
  
    
    return (
        <></>
    );
};

export default Logout;
