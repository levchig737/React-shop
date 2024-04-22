import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateCategories = () => {
  const [item, setItem] = useState({
    name: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const itemId = location.pathname.split("/")[3];

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  if (errorRole) {
      return <h1>Ошибка: Не удалось получить роль пользователя.</h1>;
    }
  
    if (userRole !== "admin" && userRole !== "manager") {
      return <h1>Нет доступа</h1>;
    }

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/category/${itemId}/`, item, {
        withCredentials: true // Устанавливаем опцию withCredentials в true
    });
      navigate("/categories");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the category</h1>
      <input
        type="text"
        placeholder="Category name"
        name="name"
        onChange={handleChange}
      />
     
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
    </div>
  );
};

export default UpdateCategories;
