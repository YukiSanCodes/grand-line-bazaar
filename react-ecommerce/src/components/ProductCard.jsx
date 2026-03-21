import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 shadow-sm">
      <Link
        to={`/product/${product.id}`}
        className="text-decoration-none text-body"
      >
        <div className="product-img-wrapper">
          {product.discount ? (
            <div className="sale-badge">-{product.discount}%</div>
          ) : null}

          <img
            src={product.image}
            className="card-img-top product-img"
            alt={product.name}
          />
        </div>
      </Link>

      <div className="card-body d-flex flex-column">
        <Link
          to={`/product/${product.id}`}
          className="text-decoration-none text-body"
        >
          <h6 className="card-title">{product.name}</h6>
        </Link>

        <div className="mb-2 text-glb-accent">
          {[...Array(5)].map((star, index) => (
            <i
              key={index}
              className={`fa-star ${index < product.rating ? "fas" : "far"} fa`}
            ></i>
          ))}
        </div>

        <div className="mb-2">
          <span className="text-muted text-decoration-line-through me-2">
            ₱{product.oldPrice}
          </span>
          <span className="fw-bold text-danger">₱{product.price}</span>
        </div>

        <button
          className="btn btn-primary btn-glb-cta mt-auto"
          type="button"
          onClick={() => addToCart(product)}
        >
          <i className="fas fa-shopping-cart me-2"></i>
          Pre-Order
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
