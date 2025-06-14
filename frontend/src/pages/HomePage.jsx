import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="min-h-[calc(100vh-theme(spacing.16))] flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 py-20 md:py-32 relative overflow-hidden">
      
      {/* Animated background circles */}
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-blue-300 opacity-20 rounded-full blur-3xl top-10 left-10 z-0 animate-pulse"></div>
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-72 md:h-72 bg-pink-400 opacity-20 rounded-full blur-3xl bottom-10 right-10 z-0 animate-pulse"></div>

      {/* Floating icons */}
      <div className="absolute top-10 right-1/4 text-3xl sm:text-4xl md:text-5xl opacity-30 animate-bounce-slow z-0">🛏️</div>
      <div className="absolute bottom-16 left-1/4 text-3xl sm:text-4xl md:text-5xl opacity-30 animate-bounce-slow z-0">🏡</div>

      {/* Main content */}
      <div className="relative z-10 max-w-xl sm:max-w-2xl md:max-w-3xl px-2 sm:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-snug md:leading-tight drop-shadow-md">
          Find Your <span className="text-blue-600">Perfect Stay</span>
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-8 max-w-lg sm:max-w-xl mx-auto">
          Discover unique stays, cozy homes, and amazing rentals at your fingertips.
        </p>

        <div className="flex justify-center">
          <Link to="/listings">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out text-sm sm:text-base font-medium flex items-center justify-center gap-2">
              <span className="text-lg sm:text-xl animate-spin-slow">🌍</span> Explore Listings
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
