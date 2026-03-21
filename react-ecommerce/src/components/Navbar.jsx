import { useContext } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme } = useTheme();
  const { cart } = useContext(CartContext);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isProductsPage = location.pathname === '/products';
  const qFromUrl = searchParams.get('q') ?? '';

  const handleNavSearch = (e) => {
    e.preventDefault();
    const raw = new FormData(e.currentTarget).get('q');
    const q = typeof raw === 'string' ? raw.trim() : '';
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    const suffix = params.toString() ? `?${params.toString()}` : '';
    navigate(`/products${suffix}`);
  };

  const navBarClasses =
    theme === 'dark'
      ? 'navbar-dark bg-dark border-bottom border-secondary'
      : 'navbar-light bg-light border-bottom border-secondary';

  const bottomBarClasses =
    theme === 'dark' ? 'bg-dark border-secondary' : 'bg-light border-secondary';

  return (
    <>
      {/* Desktop */}
      <nav
        className={`navbar navbar-expand-lg d-none d-lg-block shadow-sm ${navBarClasses}`}
      >
        <div className="container">
          <NavLink
            className="navbar-brand d-flex align-items-center py-1"
            to="/"
            title="Grand Line Bazaar"
          >
            <img
              src={`${import.meta.env.BASE_URL}one-piece.png`}
              alt="Grand Line Bazaar"
              className="navbar-brand-logo"
              decoding="async"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-wrap">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/policies"
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Policies & Terms
                </NavLink>
              </li>
            </ul>

            <form
              key={isProductsPage ? `nav-search-${qFromUrl}` : 'nav-search-off'}
              className="d-flex align-items-center gap-1 glb-nav-search me-lg-3 mb-2 mb-lg-0"
              role="search"
              onSubmit={handleNavSearch}
            >
              <input
                name="q"
                className="form-control"
                type="search"
                placeholder="Search products"
                aria-label="Search products"
                defaultValue={isProductsPage ? qFromUrl : ''}
              />
              <button className="btn btn-outline-primary btn-sm" type="submit">
                Search
              </button>
            </form>

            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <i className="fa fa-shopping-cart my-2" aria-hidden />
                  <span className="badge rounded-pill badge-glb-cart ms-2">
                    {totalQty}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile bottom */}
      <nav
        className={`navbar fixed-bottom border-top d-lg-none shadow-lg ${bottomBarClasses}`}
      >
        <div className="container-fluid d-flex justify-content-around text-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-primary text-decoration-none'
                : 'text-body text-decoration-none'
            }
          >
            <div>
              <i className="fa fa-home fs-5" aria-hidden />
              <div className="bottom-nav-label">Home</div>
            </div>
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'text-primary text-decoration-none'
                : 'text-body text-decoration-none'
            }
          >
            <div>
              <i className="fa fa-box fs-5" aria-hidden />
              <div className="bottom-nav-label">Products</div>
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? 'text-primary text-decoration-none position-relative'
                : 'text-body text-decoration-none position-relative'
            }
          >
            <div className="position-relative">
              <i className="fa fa-shopping-cart fs-5" aria-hidden />
              {totalQty > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-glb-cart bottom-nav-badge">
                  {totalQty}
                </span>
              )}
              <div className="bottom-nav-label">Cart</div>
            </div>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-primary text-decoration-none'
                : 'text-body text-decoration-none'
            }
          >
            <div>
              <i className="fa fa-info-circle fs-5" aria-hidden />
              <div className="bottom-nav-label">About</div>
            </div>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-primary text-decoration-none'
                : 'text-body text-decoration-none'
            }
          >
            <div>
              <i className="fa fa-phone fs-5" aria-hidden />
              <div className="bottom-nav-label">Contact</div>
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
