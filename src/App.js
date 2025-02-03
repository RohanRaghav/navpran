import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HeroSection from './Pages/HeroSection';
import Profile from './Pages/Profile';
import Available from './Pages/Available';
import Admin from './Pages/Admin';
import Voucher from './Pages/Voucher';
import Inventory from './Pages/Inventory';
import NotificationEdit from './Pages/NotificationEdit';

function App() {
  return (
    <div className='app'>
      <Router>
      <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/availability" element={<Available />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/provide-voucher" element={<Voucher />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/delete-quest" element={<NotificationEdit />} />
      </Routes>
      </Router>
      <div className='footers'>
        <div className='handles'>
          <div>
            Organized by
          </div>
          <div>
            Sponsered by
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
