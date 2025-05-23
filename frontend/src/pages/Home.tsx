// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div className="hero min-h-[70vh] bg-base-100 rounded-box shadow-xl">
            <div className="hero-content text-center">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold text-primary">
                        Dipendra Transport Services
                    </h1>
                    <p className="py-6 text-lg">
                        Your reliable and comfortable daily passenger vehicle service connecting Birtamode and Ilam.
                        Book your seats online hassle-free!
                    </p>
                    <figure className="my-6">
                        {/* You can add an image of your vehicle or a scenic route photo here */}
                        {/* Example placeholder: */}
                        <img
                            src="https://via.placeholder.com/600x300.png?text=Our+Comfortable+Vehicle" // Replace with your actual image URL
                            alt="Transport Vehicle"
                            className="rounded-lg shadow-md mx-auto"
                            style={{maxWidth: '100%', height: 'auto'}}
                        />
                    </figure>
                    <Link to="/book" className="btn btn-primary btn-lg">
                        Book Your Seat Now
                    </Link>
                    <div className="mt-8 p-4 bg-base-200 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
                        <ul className="list-disc list-inside text-left space-y-1">
                            <li>Daily Departures: Birtamode to Ilam & Ilam to Birtamode.</li>
                            <li>Comfortable 11-Seater Vehicle.</li>
                            <li>Easy Online Booking System.</li>
                            <li>Experienced and Friendly Driver.</li>
                            <li>Punctual and Reliable Service.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;