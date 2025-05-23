// src/components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Dipendra Transport
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/book">Book Seats</Link>
                    </li>
                    {/* You can add more links, e.g., Contact, About */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;