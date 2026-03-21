// useContext allows this component to consume global state
import { useContext } from "react";
// Import the CartContext created using React Context API
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';

const Cart = () => {

    // Access global cart state and actions from Context (no prop drilling)
    const { cart, removeFromCart, increaseQty, decreaseQty} = useContext(CartContext);

    // Compute total price from global cart state
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Helper function to format currency (Philippine peso format)
    const formatPrice = (value) => {
        return value.toLocaleString('en-PH', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0 d-flex align-items-center gap-2">
                  <i className="fas fa-shopping-cart text-glb-accent" aria-hidden />
                  Shopping Cart
                </h2>
            </div>


        {/* Conditional rendering based on global cart state */}
        {cart.length === 0 && (
            <div className="alert alert-glb-empty mb-0" role="status">
              Your cart is empty.
            </div>
        )}

        {/* Render cart items from Context state */}
        {cart.map(item => (
            <div key={item.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                    <div className="row align-items-center">

                        {/* Product Info (data comes from Context) */}
                        <div className="col-12 col-md-4 mb-3 mb-md-0">
                            <h5 className="mb-1">{item.name}</h5>
                            <small className="text-muted">
                                ₱{formatPrice(item.price)}
                            </small>
                        </div>

                        {/* Quantity Controls (trigger Context functions) */}
                        <div className="col-12 col-md-4 mb-3 mb-md-0 text-center">
                            <div className="d-flex justify-content-center align-items-center">
                            <button 
                                // Calls Context action to decrease quantity globally
                                onClick={() => decreaseQty(item.id)}
                                className="btn btn-outline-secondary btn-sm">
                                    -
                                </button>
                            
                            {/* Quantity from global state */}
                            <span className="mx-3 fw-bold">{item.qty}</span>
                            <button
                                // Calls Context action to increase quantity globally
                                onClick={() => increaseQty(item.id)}
                                className="btn btn-outline-secondary btn-sm">
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Remove Button (updates global cart state) */}
                        <div className="col-12 col-md-4 text-center text-md-end">
                            <button
                                // Calls Context function to remove item from global state
                                onClick={() => removeFromCart(item.id)}
                                className="btn btn-outline-danger btn-sm">
                                    Remove
                                </button>
                            </div>
                    </div>

                </div>
            </div>
        ))}

                    {/* Total Section (derived from Context state) */}
                    {cart.length > 0 && (
                        <div className="card shadow mt-4">
                        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">

                        {/* Total updates automatically when Context state changes */}
                        <h4 className="mb-3 mb-md-0">
                            Total: ₱{formatPrice(total)}
                        </h4>

                        <Link to="/checkout" className="btn btn-primary btn-lg btn-glb-cta">
                            Proceed to Checkout
                        </Link>

                        </div>
                    </div>
                    )}
        </div>
    );

};

export default Cart;
