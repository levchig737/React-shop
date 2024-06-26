import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

const AddImage = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const itemId = location.pathname.split("/")[3];

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
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
            const formData = new FormData();
            formData.append("file", image); // change key to "file"
            formData.append("cur_user", JSON.stringify({})); // pass empty user object
            const response = await axios.post("http://localhost:8000/image/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            });

            console.log(response.data); // log success message
            
            // Create image record after successful upload
            const imageData = {
                name: response.data, // assuming filename contains name
                product_id: itemId
            };
            console.log(imageData); // log success message
    
            await axios.post("http://localhost:8000/image/", imageData, {
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
            <h1>Add new image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
        </div>
    );
};

export default AddImage;
