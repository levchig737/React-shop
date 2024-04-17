import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UpdateItem = () => {
  const [item, setItem] = useState({
    title: "",
    description: "",
    price: null,
    count: null,
    category_id: null,
    brand_id: null,
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const itemId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/product/${itemId}/`, item, {
        withCredentials: true // Устанавливаем опцию withCredentials в true
    });
      navigate("/admin");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the item</h1>
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
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default UpdateItem;
