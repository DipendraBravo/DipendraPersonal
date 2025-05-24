// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link as RouterLink } from 'react-router-dom';

// Import your page components
import HomePage from './pages/Home';
import BookingPage from './pages/BookingPage'; // Assuming this is your main booking page
import ConfirmationPage from './pages/ConfirmationPage';
import Navbar from './components/Navbar/Navbar'; // The Navbar component

// Layout component to include Navbar and Footer on most pages
const AppLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />
            <h1> This website is still on development phase thank you</h1>
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                <Outlet /> {/* Nested routes will render here */}
            </main>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by Dipendra Tamang</p>
                    <p>Birtamode - Ilam Daily Service</p>
                </aside>
            </footer>
        </div>
    );
};

// Not Found Page Component
const NotFoundPage: React.FC = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
            <RouterLink to="/" className="btn btn-primary">
                Go to Homepage
            </RouterLink>
        </div>
    );
};


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route element={<AppLayout />}> {/* Routes using the common layout */}
                    <Route index element={<HomePage />} />
                    <Route path="/book" element={<BookingPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
                </Route>
                {/* You can add routes without the AppLayout here if needed */}
            </Routes>
        </Router>
    );
};

export default App;