import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchAllBrands = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/brands/");
                setBrands(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBrands();
    }, []);

    console.log(brands);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/brands/${id}/`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button>
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    Shop
                </Link>
            </button>
            <button>
                <Link to="/brands" style={{ color: "inherit", textDecoration: "none" }}>
                    Brands
                </Link>
            </button>
            <button>
                <Link to="/categories" style={{ color: "inherit", textDecoration: "none" }}>
                    Categories
                </Link>
            </button>
            <h1>Admin panel</h1>
            <h2>Brands</h2>
            <div>
                {brands.map((item) => (
                    <div key={item.id}>
                        <h2>{item?.name} {item?.id}</h2>
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

            <button className="addHome">
                <Link to="/brands/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add new brand
                </Link>
            </button>
        </div>
    );
};

export default Brands;
