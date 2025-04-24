import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/home/components/Navbar';
import Home from './pages/home/Home';
import Discover from './pages/discover/Discover';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Cart from './pages/cart/Cart';
import SingleItem from './pages/singleView/SingleView';

function App() {
  return (
    <div className="App" >
      <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/singleItem" element={<SingleItem />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
