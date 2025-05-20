import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/home/components/Navbar';
import Home from './pages/home/Home';
import Discover from './pages/discover/Discover';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import SingleItem from './pages/singleView/SingleView';
import AdminForm from './pages/admin/adminForm';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only if the current path is not "/login" */}
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/*" element={<Login />} /> {/* Use wildcard for nested routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/singleItem" element={<SingleItem />} />
        <Route path="/adminForm" element={<AdminForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
