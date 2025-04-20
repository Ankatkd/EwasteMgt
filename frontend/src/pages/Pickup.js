import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pickup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    schedulerName: '',
    phone: '',
    email: '',
    weight: '',
  });

  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || !userId) navigate('/login');
  }, [navigate, userId]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // returns YYYY-MM-DD
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('http://localhost:8082/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 4000 }) // ₹40 in paise
      });

      const { id: order_id, currency, amount } = await orderRes.json();

      const options = {
        key: 'rzp_test_bx3dOuw8U5uwJ3',
        amount,
        currency,
        name: 'E-Waste Management',
        description: 'Pickup Charge',
        order_id,
        handler: async (response) => {
          const requestData = {
            ...formData,
            userId,
            status: 'Pending',
          };

          const res = await fetch('http://localhost:8082/api/razorpay/success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
          });

          if (res.ok) {
            alert('Pickup scheduled successfully!');
            navigate('/profile');
          } else {
            alert('Pickup failed. Please try again.');
          }
        },
        prefill: {
          name: formData.schedulerName,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#2f855a' }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Payment initiation failed.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white min-h-screen p-5">
        <h1 className="text-xl font-bold mb-8">♻️ E-Waste Manager</h1>
        <ul className="space-y-4">
          <li className="cursor-pointer flex items-center gap-2" onClick={() => navigate('/profile')}>
            🧭 Dashboard
          </li>
          <li className="cursor-pointer flex items-center gap-2" onClick={() => navigate('/profile')}>
            🛠️ Edit Profile
          </li>
          <li className="cursor-pointer flex items-center gap-2" onClick={() => navigate('/profile')}>
            📜 Pickup History
          </li>
        </ul>
        <button
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userId');
            navigate('/login');
          }}
          className="mt-10 bg-white text-green-800 px-4 py-2 rounded hover:bg-green-100 w-full"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <button onClick={() => navigate('/profile')} className="mb-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
            ← Back to Dashboard
          </button>

          <h2 className="text-2xl font-bold mb-6 text-green-800">Schedule E-Waste Pickup</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getTodayDate()}
                required
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Full Address" required className="w-full p-2 border rounded" />
            <div className="flex space-x-4">
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="w-1/3 p-2 border rounded" />
              <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="w-1/3 p-2 border rounded" />
              <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="w-1/3 p-2 border rounded" />
            </div>
            <div className="flex space-x-4">
              <input type="text" name="schedulerName" value={formData.schedulerName} onChange={handleChange} placeholder="Your Name" required className="w-1/2 p-2 border rounded" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-1/2 p-2 border rounded" />
            </div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Estimated Weight (kg)" required className="w-full p-2 border rounded" />

            <div className="text-sm text-gray-600">Pickup charge: ₹40 (via Razorpay)</div>

            <button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded w-full">
              {loading ? 'Scheduling...' : 'Pay & Schedule'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Pickup;
