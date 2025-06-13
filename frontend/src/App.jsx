import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import EditListing from './pages/EditListing';
import Login from './pages/Login';
import Register from './pages/Register';
import HostDashboard from './pages/HostDashboard';
import AddListing from './pages/AddListing';
import Bookings from './pages/Bookings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <Bookings />
                </PrivateRoute>
              }
            />

            <Route
              path="/host/edit/:id"
              element={
                <PrivateRoute>
                  <EditListing/>
                </PrivateRoute>
              }
            />
    
            <Route
              path="/host/dashboard"
              element={
                <PrivateRoute>
                  <HostDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/host/add"
              element={
                <PrivateRoute>
                  <AddListing />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
