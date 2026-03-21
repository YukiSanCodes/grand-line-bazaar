/**
 * Pure helpers for client-side product search, filter, and sort.
 * @typedef {{ id: number; name: string; price: number; rating: number; category: string; [key: string]: unknown }} Product
 */

/** @param {Product[]} products */
/** @param {string | undefined} categoryFromUrl */
export function filterByCategory(products, categoryFromUrl) {
  if (!categoryFromUrl) return products;
  const c = categoryFromUrl.toLowerCase();
  return products.filter((p) => p.category.toLowerCase() === c);
}

/** @param {Product[]} products */
/** @param {string} q */
export function filterBySearchQuery(products, q) {
  const term = q.trim().toLowerCase();
  if (!term) return products;
  return products.filter((p) => p.name.toLowerCase().includes(term));
}

/** @param {Product[]} products */
/** @param {number | ''} minPrice */
/** @param {number | ''} maxPrice */
export function filterByPriceRange(products, minPrice, maxPrice) {
  const min = minPrice === "" ? null : Number(minPrice);
  const max = maxPrice === "" ? null : Number(maxPrice);
  return products.filter((p) => {
    if (min != null && !Number.isNaN(min) && p.price < min) return false;
    if (max != null && !Number.isNaN(max) && p.price > max) return false;
    return true;
  });
}

/** @typedef {'price-asc' | 'price-desc' | 'name-asc' | 'rating-desc'} SortOption */

/** @param {Product[]} products */
/** @param {SortOption} sort */
export function sortProducts(products, sort) {
  const copy = [...products];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "rating-desc":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

/**
 * @param {Product[]} products
 * @param {{ category?: string; q?: string; minPrice?: number | ''; maxPrice?: number | ''; sort?: SortOption }} opts
 */
export function applyProductQuery(products, opts) {
  const {
    category,
    q = "",
    minPrice = "",
    maxPrice = "",
    sort = "rating-desc",
  } = opts;
  let list = filterByCategory(products, category);
  list = filterBySearchQuery(list, q);
  list = filterByPriceRange(list, minPrice, maxPrice);
  return sortProducts(list, sort);
}

/** @param {Product[]} products @param {number} n */
export function featuredByRating(products, n = 4) {
  return [...products]
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        (b.discount ?? 0) - (a.discount ?? 0)
    )
    .slice(0, n);
}
