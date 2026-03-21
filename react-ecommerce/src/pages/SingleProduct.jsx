import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { API_BASE } from '../config/api';
import { demoFetchDelay } from '../utils/demoDelay';

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/products/${id}`)
      .then((res) => {
        if (res.status === 404) {
          setProduct(null);
          setError('notfound');
          return null;
        }
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(async (data) => {
        await demoFetchDelay();
        if (cancelled) return;
        if (data) setProduct(data);
        setLoading(false);
      })
      .catch(async (err) => {
        if (cancelled) return;
        console.error(err);
        await demoFetchDelay();
        setError('error');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="placeholder-glow rounded">
              <span
                className="placeholder col-12 d-block rounded"
                style={{ minHeight: 320 }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <span className="placeholder col-8 placeholder-lg mb-3 d-block" />
            <span className="placeholder col-6 mb-2 d-block" />
            <span className="placeholder col-4 mb-4 d-block" />
            <span className="placeholder col-12 py-3 d-block" />
          </div>
        </div>
      </div>
    );
  }

  if (error === 'notfound' || !product) {
    return (
      <div className="container text-center py-5">
        <h2>Product not found</h2>
        <p className="text-muted">We could not find a Devil Fruit with that ID.</p>
        <Link to="/products" className="btn btn-primary">
          Back to products
        </Link>
      </div>
    );
  }

  if (error === 'error') {
    return (
      <div className="container text-center py-5">
        <h2>Something went wrong</h2>
        <p className="text-muted">Please try again later.</p>
        <Link to="/products" className="btn btn-primary">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row g-4 align-items-start">
        <div className="col-md-6">
          <div className="product-detail-img-wrap border">
            <img
              src={product.image}
              className="product-detail-img"
              alt={product.name}
            />
          </div>
        </div>
        <div className="col-md-6">
          <p className="text-muted small mb-1">{product.category}</p>
          <h1 className="h2">{product.name}</h1>
          <div className="mb-3 text-glb-accent">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={`fa-star ${index < product.rating ? 'fas' : 'far'} fa me-1`}
              />
            ))}
            <span className="text-body small ms-1">({product.rating}/5)</span>
          </div>
          <div className="mb-4">
            <span className="text-muted text-decoration-line-through me-2">
              ₱{product.oldPrice}
            </span>
            <span className="fs-3 fw-bold text-danger">₱{product.price}</span>
            {product.discount ? (
              <span className="badge bg-danger ms-2">-{product.discount}%</span>
            ) : null}
          </div>
          <p className="text-muted">
            Authentic listing from Grand Line Bazaar. Add to your cart for pre-order
            processing — our crew will confirm availability before you set sail.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-glb-cta"
            onClick={() => addToCart(product)}
          >
            <i className="fas fa-shopping-cart me-2" />
            Pre-Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
