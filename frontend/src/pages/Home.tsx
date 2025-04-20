export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Your Journey Starts Here</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Book comfortable vehicle tours with our premium service
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition">
                        Book Now
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '🚗',
                            title: 'Modern Vehicles',
                            desc: 'Air-conditioned, well-maintained cars and vans'
                        },
                        {
                            icon: '⏱️',
                            title: 'On Time',
                            desc: 'Punctual pickups and drop-offs guaranteed'
                        },
                        {
                            icon: '💰',
                            title: 'Best Prices',
                            desc: 'Competitive rates with no hidden charges'
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}