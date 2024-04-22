import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddBrand = () => {
  const [brand, setBrand] = useState({
    name: "",
  });
  const [error,setError] = useState(false)

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

    if (errorRole) {
        return <h1>Ошибка: Не удалось получить роль пользователя.</h1>;
      }
    
      if (userRole !== "admin" && userRole !== "manager") {
        return <h1>Нет доступа</h1>;
      }

  const handleChange = (e) => {
    setBrand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/brand/", brand, {
            withCredentials: true
        });
      navigate("/brands");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add new brand</h1>
      <input
        type="text"
        placeholder="Brand name"
        name="name"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
    </div>
  );
};

export default AddBrand;
