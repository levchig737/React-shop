import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPanel = () => {
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
        const res = await axios.get("http://localhost:8000/product/?skip=0&limit=100");
        const [items, totalItems] = res.data;
        if (items && totalItems > 0) {
          setItems(items);
          console.log(res.data);
        } else {
          console.log(res.data);
        }
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}/`, {
        withCredentials: true
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="admin-panel">
        <button className="update">
          <Link to="/brands" style={{ color: "inherit", textDecoration: "none" }}>
            Brands
          </Link>
        </button>
        <button className="update">
          <Link to="/categories" style={{ color: "inherit", textDecoration: "none" }}>
            Categories
          </Link>
        </button>
      </div>
      <h1>Admin panel</h1>
      <div className="books">
        {items && items.length > 0 && items.map((item) => (
          <div key={item.id} className="book">
            {item?.images[0] && item?.images[0].name && (
              <img src={"./img/" + item?.images[0].name} alt={item?.title} />
            )}
            <button className="update">
              <Link
                to={`/images/add/${item.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Add image
              </Link>
            </button>
            <h2>{item.name}</h2>
            <p>{item?.brand?.name}</p>
            <p>{item?.category?.name}</p>
            <p>{item.description}</p>
            <p>{item.quantity}</p>
            <h3>${item.price}</h3>
            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${item.id}`}
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
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new product
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
