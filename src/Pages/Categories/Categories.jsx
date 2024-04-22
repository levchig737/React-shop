import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
    const [items, setItems] = useState([]);

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
      const fetchAllItems = async () => {
          try {
              const res = await axios.get("http://localhost:8000/category");
              setItems(res.data);
              console.log(items);
          } catch (err) {
            console.log(err);
          }
      };
      fetchAllItems();
  }, []);

  if (errorRole) {
    return <h1>Ошибка: Не удалось получить роль пользователя.</h1>;
  }

  if (userRole !== "admin" && userRole !== "manager") {
    return <h1>Нет доступа</h1>;
  }

    console.log(items, "fes");

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/category/${id}/`, {
                withCredentials: true
            });
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
          <div className="admin-panel">
            <button className="update">
                <Link to="/admin" style={{ color: "inherit", textDecoration: "none" }}>
                    Products
                </Link>
            </button>
            <button className="update">
                <Link to="/brands" style={{ color: "inherit", textDecoration: "none" }}>
                    Brands
                </Link>
            </button>
          </div>
            <h1>Admin panel</h1>
            <div className="books">
              {items && items.length > 0 && items.map((item) => (
                    <div key={item.id} className="book">
      
                        <h2>{item.name}</h2>
                        
                        <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                        <button className="update">
                            <Link
                                to={`/categories/update/${item.id}`}
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Update
                            </Link>
                        </button>
                    </div>
                ))}
            </div>

            <div className="AddItem">
              <button>
                  <Link to="/categories/add" style={{ color: "inherit", textDecoration: "none" }}>
                      Add new category
                  </Link>
              </button>
            </div>
        </div>
    );
};

export default Categories;
