import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';


import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Pickup from './pages/Pickup';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import OurMission from './pages/OurMission'; 
import Maps from './pages/MapsLeaflet';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/pickup" element={<Pickup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/our-mission" element={<OurMission />} />
            <Route path="/maps" element={<Maps />} />
             {/* ✅ Protected route */}
            <Route path="/profile" element={  <ProtectedRoute> <Profile /></ProtectedRoute>}/>
            <Route path="/pickup" element={<Pickup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
