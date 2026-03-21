import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import CartToast from './components/CartToast';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import About from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/Policies'; // <-- import your new page

import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function SingleProductRoute() {
  const { id } = useParams();
  return <SingleProduct key={id} />;
}

function App() {
  return (
    <Router>
      {/* Always full width */}
      <Header />
      <Navbar />
      <CartToast />

      {/* Main content wrapper - full width, no shrinking */}
      <div className="container-fluid px-4 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<SingleProductRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} /> {/* <-- new route */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/:category" element={<ProductList />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;