import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCardSkeletonGrid from "../components/ProductCardSkeletonGrid";
import Sidebar from "../components/Sidebar";
import { API_BASE } from "../config/api";
import { applyProductQuery } from "../utils/productQuery";
import { demoFetchDelay } from "../utils/demoDelay";

const SORT_OPTIONS = [
  { value: "rating-desc", label: "Rating (high to low)" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "price-desc", label: "Price (high to low)" },
  { value: "name-asc", label: "Name (A–Z)" },
];

const ProductList = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const qFromUrl = searchParams.get("q") ?? "";

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(qFromUrl);
  const [minPrice, setMinPrice] = useState(/** @type {string} */ (""));
  const [maxPrice, setMaxPrice] = useState(/** @type {string} */ (""));
  const [sort, setSort] = useState(
    /** @type {'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc'} */ (
      "rating-desc"
    )
  );

  useEffect(() => {
    setSearchInput(qFromUrl);
  }, [qFromUrl]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then(async (data) => {
        await demoFetchDelay();
        setAllProducts(data);
        setLoading(false);
      })
      .catch(async (error) => {
        console.error("API Fetch Error:", error);
        await demoFetchDelay();
        setLoading(false);
      });
  }, []);

  const displayProducts = useMemo(
    () =>
      applyProductQuery(allProducts, {
        category,
        q: qFromUrl,
        minPrice,
        maxPrice,
        sort,
      }),
    [allProducts, category, qFromUrl, minPrice, maxPrice, sort]
  );

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Products";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    const trimmed = searchInput.trim();
    if (trimmed) next.set("q", trimmed);
    else next.delete("q");
    setSearchParams(next);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-3 mb-4">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-md-9">
            <h2 className="mb-3">{pageTitle}</h2>
            <ProductCardSkeletonGrid count={8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2 col-md-3 mb-4">
          <Sidebar />
        </div>

        <div className="col-lg-10 col-md-9">
          <h2 className="mb-3">{pageTitle}</h2>

          <div className="card mb-4 shadow-sm glb-filter-panel">
            <div className="card-body">
              <form
                className="row g-2 align-items-end mb-3"
                onSubmit={handleSearchSubmit}
              >
                <div className="col-md-4">
                  <label htmlFor="product-search" className="form-label small mb-0">
                    Search by name
                  </label>
                  <input
                    id="product-search"
                    type="search"
                    className="form-control"
                    placeholder="Keyword..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    aria-label="Search products"
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary btn-glb-cta w-100">
                    Search
                  </button>
                </div>
              </form>

              <div className="row g-2 align-items-end">
                <div className="col-md-3">
                  <label htmlFor="min-price" className="form-label small mb-0">
                    Min price (₱)
                  </label>
                  <input
                    id="min-price"
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="max-price" className="form-label small mb-0">
                    Max price (₱)
                  </label>
                  <input
                    id="max-price"
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="sort-by" className="form-label small mb-0">
                    Sort by
                  </label>
                  <select
                    id="sort-by"
                    className="form-select"
                    value={sort}
                    onChange={(e) =>
                      setSort(
                        /** @type {'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc'} */ (
                          e.target.value
                        )
                      )
                    }
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {displayProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              displayProducts.map((product) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
