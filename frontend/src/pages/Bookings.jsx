import { useEffect, useState } from 'react';
import API from '../api/axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/bookings/my');
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await API.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{booking.listing.title}</h3>
                <p className="text-sm text-gray-500">{booking.listing.location}</p>
                <p className="text-sm text-gray-600">
                  {booking.checkIn.slice(0, 10)} → {booking.checkOut.slice(0, 10)}
                </p>
                <p className="text-blue-600 text-sm font-medium mt-1">
                  ₹{booking.listing.price} / night
                </p>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="mt-2 text-sm text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              </div>
              <img
                src={booking.listing.image}
                alt={booking.listing.title}
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No bookings yet.</p>
      )}
    </section>
  );
}

export default Bookings;
