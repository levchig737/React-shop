// AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
        // Замените URL на ваш эндпоинт для получения роли
        axios.get('/user/1')
            .then((response) => {
                setRole(response.data.role);
            })
            .catch((error) => {
                console.error('Ошибка при получении роли:', error);
            });
    }, []);

    return (
        <div>
            <h1>Административная панель</h1>
            <p>Роль админа: {role}</p>
        </div>
    );
};

export default AdminPanel;
