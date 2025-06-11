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
import SignUpStep2 from './pages/SignUpStep2/SignUpSteo2';
import LogInStep2 from './pages/loginstep2/LogInStep2';
import Stocklist from './pages/admin/Stocklist';
import Profile from './pages/profile/Profile';
import Comments from './pages/comments/Comments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const location = useLocation();

  // Hide Navbar on /login and /signupstep2
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signupstep2" ||
    location.pathname === "/loginstep2"; // <-- all lowercase

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/singleItem/*" element={<SingleItem />} />
        <Route path="/adminForm" element={<AdminForm />} />
        <Route path="/stocklist" element={<Stocklist />} />
        <Route path="/signupstep2" element={<SignUpStep2 />} />
        <Route path="/loginstep2" element={<LogInStep2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comments" element={<Comments />} />
        {/* Add more routes as needed */}
      </Routes>
      <ToastContainer />
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
