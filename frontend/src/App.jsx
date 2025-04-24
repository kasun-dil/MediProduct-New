import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages (create these files if they don’t exist yet)
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Product from './pages/Product';
import AboutUs from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Allproducts from './pages/Allproducts';


function App() {

  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<Allproducts />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </Router>
  );
}

export default App;
