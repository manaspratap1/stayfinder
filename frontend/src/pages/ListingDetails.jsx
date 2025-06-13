import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await API.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load listing.');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    setBookingError('');
    setBookingSuccess('');
    if (!checkIn || !checkOut) {
      setBookingError('Please select both check-in and check-out dates.');
      return;
    }

    try {
      await API.post('/bookings', {
        listingId: id,
        checkIn,
        checkOut,
      });
      setBookingSuccess('Booking successful!');
      setTimeout(() => navigate('/bookings'), 1500);
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading listing...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-72 md:h-96 object-cover rounded-lg shadow"
      />

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800">{listing.title}</h1>
        <p className="text-gray-600 text-sm mt-1">{listing.location}</p>
        <p className="text-blue-600 text-xl font-semibold mt-2">₹{listing.price} / night</p>
        <p className="mt-4 text-gray-700 leading-relaxed">{listing.description}</p>

        <div className="mt-6 space-y-2">
          <input
            type="date"
            className="border px-3 py-2 rounded w-full"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="date"
            className="border px-3 py-2 rounded w-full"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        {bookingError && <p className="text-red-500 text-sm mt-2">{bookingError}</p>}
        {bookingSuccess && <p className="text-green-600 text-sm mt-2">{bookingSuccess}</p>}

        <button
          onClick={handleBooking}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Book Now
        </button>
      </div>
    </section>
  );
}

export default ListingDetails;
