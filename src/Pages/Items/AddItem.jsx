import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const AddItem = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    price: null,
    count: null,
    category_id: null,
    brand_id: null,
  });
  const [error,setError] = useState(false)

  const [userRole, setUserRole] = useState(null);
    const [errorRole, setErrorRole] = useState(false);
    const navigate = useNavigate();


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

    if (errorRole) {
        return <h1>Ошибка: Не удалось получить роль пользователя.</h1>;
      }
    
      if (userRole !== "admin" && userRole !== "manager") {
        return <h1>Нет доступа</h1>;
      }


  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:8000/product/", item, {
            withCredentials: true
        });
        
        navigate("/admin");
    } catch (err) {
        console.log(err);
        setError(true);
    }
};

  return (
    <div className="form">
      <h1>Add new item</h1>
      <input
        type="text"
        placeholder="Item name"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Item description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Item price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Item count"
        name="count"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Item category id"
        name="category_id"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Item brand id"
        name="brand_id"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
    </div>
  );
};

export default AddItem;
