import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { API_BASE } from '../config/api';
import { demoFetchDelay } from '../utils/demoDelay';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/categories`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch categories");
                return res.json();
            })
            .then(async (data) => {
                await demoFetchDelay();
                setCategories(data);
                setLoading(false);
            })
            .catch(async (err) => {
                await demoFetchDelay();
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const linkClass = ({ isActive }) =>
        `list-group-item list-group-item-action border-1 ${
            isActive
                ? "bg-primary text-white fw-semibold"
                : "sidebar-category-link"
        }`;

    return (
        <aside className="sidebar-aside bg-light p-3 rounded border">
            <h5>Categories</h5>
            <div className="list-group list-group-flush">

                {loading && <p>Loading categories...</p>}
                {error && <p className="text-danger">Error: {error}</p>}

                {!loading && !error && (
                    <NavLink
                        to="/products"
                        end
                        className={linkClass}
                    >
                        All products
                    </NavLink>
                )}

                {!loading && !error && categories.map((category) => (
                    <NavLink
                        key={category}
                        to={`/${category.toLowerCase()}`}
                        className={linkClass}
                    >
                        {category}
                    </NavLink>
                ))}

            </div>
        </aside>
    );
};

export default Sidebar;