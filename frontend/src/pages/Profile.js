import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    fullname: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    password: ''
  });

  const [pickups, setPickups] = useState([]);
  const [view, setView] = useState('dashboard');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/user/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchPickups = async () => {
      try {
        const response = await fetch(`http://localhost:8082/api/pickups/${userId}`);
        const data = await response.json();
        setPickups(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching pickups:', error);
      }
    };

    fetchProfile();
    fetchPickups();
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const { id, fullname, location, password } = user;
      const updateData = { id, fullname, location, password };

      const response = await fetch(`http://localhost:8082/api/user/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        setView('dashboard');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const wasteItems = [
    { name: 'Fridge', price: '₹1,500', image: 'https://images.jdmagicbox.com/quickquotes/images_main/refrigerator-scrap-2219509427-iw6dq6oa.jpg' },
    { name: 'TV', price: '₹800', image: 'https://i.pinimg.com/736x/9d/c0/7e/9dc07e2422dd353ca0547d877500635b.jpg' },
    { name: 'Cooler', price: '₹500', image: 'https://5.imimg.com/data5/SELLER/Default/2022/2/KV/DD/HM/146664232/cooler-waste-scrap-500x500.png' },
    { name: 'Washing Machine', price: '₹1,200', image: 'https://as1.ftcdn.net/jpg/02/80/56/26/1000_F_280562639_qYris0M1bcJHBSjTmrtt1ueHLaDCw3Bd.jpg' },
    { name: 'Microwave', price: '₹700', image: 'https://c8.alamy.com/comp/2KYKPA1/old-broken-small-hot-plate-oven-and-other-old-e-waste-appliances-pilled-up-in-the-background-2KYKPA1.jpg' }
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white min-h-screen p-5">
        <h1 className="text-xl font-bold mb-8">♻️ E-Waste Manager</h1>
        <ul className="space-y-4 text-white">
  <li className={`cursor-pointer flex items-center gap-2 ${view === 'dashboard' && 'font-bold'}`} onClick={() => setView('dashboard')}>
    🧭 Dashboard
  </li>
  <li className={`cursor-pointer flex items-center gap-2 ${view === 'edit' && 'font-bold'}`} onClick={() => setView('edit')}>
    🛠️ Edit Profile
  </li>
  <li className={`cursor-pointer flex items-center gap-2 ${view === 'pickup' && 'font-bold'}`} onClick={() => setView('pickup')}>
    📜 Pickup History
  </li>
  <li className="cursor-pointer flex items-center gap-2 font-bold text-yellow-300" onClick={() => navigate('/pickup')}>
    📦 Schedule Pickup
  </li>
</ul>
        <button onClick={handleLogout} className="mt-10 bg-white text-green-800 px-4 py-2 rounded hover:bg-green-100 w-full">🔒 Logout</button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {view === 'dashboard' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-xl mx-auto mb-8">
              <img src="https://i.pravatar.cc/150?img=3" alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold">{user.fullname}</h3>
              <p className="text-gray-500">{user.role}</p>
              <p className="text-gray-600">{user.location}</p>
            </div>
            <section>
              <h2 className="text-lg font-semibold mb-4">Smart Insights</h2>
              <ul className="mb-4 list-disc list-inside text-gray-700">
              <li> You’ve recycled <strong>{ pickups.reduce((sum, p) => sum + (parseFloat(p.weight) || 0), 0) }</strong> kg of e-waste.</li>
              <li>Suggested next pickup: <strong>Coming soon</strong></li>
              </ul>
              <h3 className="font-semibold mb-2">Estimated Prices</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {wasteItems.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow text-center">
                    <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded mb-2" />
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-green-700">{item.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {view === 'edit' && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <input name="fullname" value={user.fullname} onChange={handleChange} className="w-full p-3 border rounded" placeholder="Full Name" />
              <input name="location" value={user.location} onChange={handleChange} className="w-full p-3 border rounded" placeholder="Location" />
              <input name="password" value={user.password} onChange={handleChange} type="password" className="w-full p-3 border rounded" placeholder="New Password" />
              <button onClick={handleUpdate} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Save</button>
            </div>
          </div>
        )}

        {view === 'pickup' && (
          <section>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Pickup History</h2>
            {pickups.length > 0 ? (
              <table className="w-full table-auto border">
                <thead className="bg-green-100">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Item Type</th>
                    <th className="p-2 border">Weight</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pickups.map((pickup, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{pickup.date || 'N/A'}</td>
                      <td className="p-2 border">{pickup.itemType || 'N/A'}</td>
                      <td className="p-2 border">{pickup.weight || 'N/A'}</td>
                      <td className="p-2 border">{pickup.status || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No pickup records found.</p>
            )}
          </section>
        )}

        {/* Terms and Conditions */}
        <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 mt-8">
          <h4 className="font-bold mb-2">Terms & Conditions:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>Prices shown are approximate and may vary based on item condition and location.</li>
            <li>Items must be in a recyclable state (no excessive damage or contamination).</li>
            <li>Pickups are subject to availability and area coverage.</li>
            <li>We reserve the right to reject items that don’t meet minimum requirements.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Profile;