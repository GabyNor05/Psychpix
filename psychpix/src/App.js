import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/home/components/Navbar';
import Home from './pages/home/Home';
import Discover from './pages/discover/Discover';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import logo from './logo.svg';

function App() {
  return (
    <div className="App" >
      <Router>
      {/* <Navbar />  */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
