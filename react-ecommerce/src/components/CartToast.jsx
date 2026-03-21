import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartToast = () => {
  const { cartNotification, dismissCartNotification } = useContext(CartContext);

  if (!cartNotification) {
    return null;
  }

  return (
    <div
      className="cart-toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 1085 }}
    >
      <div
        className="cart-toast toast show shadow"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="toast-header cart-toast-header border-0">
          <i className="fas fa-cart-plus text-glb-accent me-2" aria-hidden />
          <strong className="me-auto">{cartNotification.title}</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={dismissCartNotification}
            aria-label="Dismiss notification"
          />
        </div>
        <div className="toast-body cart-toast-body pt-0">
          <p className="mb-3 small">{cartNotification.productName}</p>
          <div className="d-flex flex-wrap gap-2">
            <Link
              to="/cart"
              className="btn btn-sm btn-primary btn-glb-cta"
              onClick={dismissCartNotification}
            >
              View cart
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={dismissCartNotification}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartToast;
