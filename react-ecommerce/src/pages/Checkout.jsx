import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  // Get cart and clear function from global context
  const { cart, clearCart } = useContext(CartContext);

  // Form state (controlled components)
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    payment: 'cod',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  // Compute total price
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  // Handle form input change 
  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value // dynamic property update
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page reload

    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please complete all fields");
      return;
    }

    // Save total BEFORE clearing cart
    setFinalTotal(total);

    // Order is valid → clear the cart
    clearCart(); // <- this resets cart to zero
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <h2>Order Confirmed!</h2>
        <p>Thank you, {form.name}. Your order has been placed.</p>
        <p>Total Amount: ₱{finalTotal.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div className="row">
        {/* Checkout Form */}
        <div className="col-md-6">
          <h4>Customer Information</h4>

          <form onSubmit={handleSubmit}>

            <div className="mb-2">
              <label>Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-2">
              <label>Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-2">
              <label>Address</label>
              <textarea name="address" className="form-control" onChange={handleChange}></textarea>
            </div>

            <div className="mb-2">
              <label>Phone</label>
              <input type="text" name="phone" className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label>Payment Method</label>
              <select name="payment" className="form-control" onChange={handleChange}>
                <option value="cod">Cash on Delivery</option>
                <option value="gcash">GCash</option>
                <option value="card">Credit Card</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-glb-cta w-100">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <h4>Order Summary</h4>

          {cart.map(item => (
            <div key={item.id} className="d-flex justify-content-between">
              <span>{item.name} x {item.qty}</span>
              <span>₱{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}

          <hr />
          <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
          <p>Tax (12%): ₱{tax.toFixed(2)}</p>
          <h5>Total: ₱{total.toFixed(2)}</h5>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;