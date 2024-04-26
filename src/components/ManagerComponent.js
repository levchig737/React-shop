import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerComponent = () => {
  const [userRole, setUserRole] = useState(null);
  const [errorRole, setErrorRole] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:8000/me", { withCredentials: true });
        setUserRole(res.data[0]?.role);
      } catch (err) {
        console.log(err);
        setErrorRole(true);
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    if (userRole) {
      const socket = new WebSocket(`ws://localhost:8000/ws?role=${userRole}`);
  
      socket.onopen = function() {
        console.log('WebSocket соединение установлено.');
      };
  
      socket.onmessage = function(event) {
        console.log('Получено сообщение от сервера:', event.data);
        // Здесь можно добавить логику для отображения сообщения о покупке
        alert(event.data);
      };
  
      socket.onclose = function(event) {
        console.log('WebSocket соединение закрыто:', event);
      };
  
      return () => {
        socket.close();
      };
    }
  }, [userRole]);

  return (
    <div>
      {/* Здесь разместите контент менеджера */}
    </div>
  );
};

export default ManagerComponent;
