import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import BannerCarousel from '../components/BannerCarousel';
import ProductCardSkeletonGrid from '../components/ProductCardSkeletonGrid';
import { API_BASE } from '../config/api';
import { featuredByRating } from '../utils/productQuery';
import { demoFetchDelay } from '../utils/demoDelay';

const HomeIntroPane = () => (
  <section
    className="home-intro-pane card border-0 shadow-sm h-100"
    aria-labelledby="home-intro-heading"
  >
    <div className="card-body p-4">
      <h2 id="home-intro-heading" className="h5 text-glb-accent mb-3">
        Sail the Grand Line
      </h2>
      <p className="mb-3 small">
        Welcome to <strong>Grand Line Bazaar</strong> — a collector&apos;s port
        inspired by the world of <em>One Piece</em>. Like the rare treasures
        sought across the four seas, our Devil Fruits are curated for pirates
        and adventurers who dream big.
      </p>
      <p className="mb-0 small text-muted">
        Hoist your flag, browse the catalog, and pre-order before another crew
        beats you to the haul. The next legendary find might be one click away.
      </p>
    </div>
  </section>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then(async (data) => {
        await demoFetchDelay();
        setProducts(data);
        setLoading(false);
      })
      .catch(async (err) => {
        console.error(err);
        await demoFetchDelay();
        setLoading(false);
      });
  }, []);

  const featured = featuredByRating(products, 4);

  return (
    <div className="container">
      <div className="row g-4 align-items-start">
        {/* Pane 1 & 2: hero image + One Piece–themed copy (stacked) */}
        <div className="col-12 col-lg-5">
          <div className="d-flex flex-column gap-4">
            <div className="home-pane-image rounded overflow-hidden border">
              <BannerCarousel />
            </div>
            <HomeIntroPane />
          </div>
        </div>

        {/* Pane 3: featured only */}
        <div className="col-12 col-lg-7">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h2 className="mb-0 h3">Featured Devil Fruits</h2>

            <Link to="/products" className="btn btn-outline-primary btn-sm">
              View all products
            </Link>
          </div>

          {loading ? (
            <ProductCardSkeletonGrid
              count={4}
              itemColClass="col-6"
              rowClassName="row g-3"
            />
          ) : (
            <div className="row g-3">
              {featured.map((product) => (
                <div className="col-6" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
