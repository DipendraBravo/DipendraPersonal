import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar bg-neutral text-neutral-content">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    <h1 className="text-5xl font-bold">
                        <span className="text-secondary">SINGAR</span>
                        <span className="text-red"> TRAVEL</span>
                    </h1>
                </Link>

                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-200 transition">
                        Home
                    </Link>
                    <Link to="/routes" className="hover:text-blue-200 transition">
                        Routes
                    </Link>
                    <Link to="/about" className="hover:text-blue-200 transition">
                        About
                    </Link>
                    <Link to="/bookings" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
                        My Bookings
                    </Link>
                </div>
            </div>
        </nav>
    );
}