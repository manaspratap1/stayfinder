import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AddListing() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('location', formData.location);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (imageFile) data.append('image', imageFile);

    try {
      const res = await API.post('/listings', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Listing added:', res.data);
      setSuccess('Listing added successfully!');
      setTimeout(() => {
        navigate('/host/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Listing</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price per night"
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 border rounded"
          rows="4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Add Listing
        </button>
      </form>
    </section>
  );
}

export default AddListing;
