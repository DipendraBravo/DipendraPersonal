import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import axios from 'axios';
import './index.css';

function App() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hello`)
            .then(res => setMessage(res.data))
            .catch(err => setError('Failed to connect to backend'));
    }, []);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                {/* Display API message or error */}
                {message && (
                    <div className="bg-blue-100 text-blue-800 p-4 text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 text-red-800 p-4 text-center">
                        {error}
                    </div>
                )}

                <main className="flex-grow p-6">
                    <div className="max-w-7xl mx-auto">
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                </main>

                {/* Footer would go here */}
            </div>
        </Router>
    );
}

export default App;