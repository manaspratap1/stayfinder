import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await API.get('/listings');
        console.log('Fetched listings:', res.data); 
        setListings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading listings...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Listings</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map(listing => (
          <Link
            to={`/listing/${listing._id}`} 
            key={listing._id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={listing.image || 'https://source.unsplash.com/featured/?hotel'} 
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
              <p className="text-gray-500 text-sm">{listing.location}</p>
              <p className="text-blue-600 font-bold mt-2">₹{listing.price} / night</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Listings;
