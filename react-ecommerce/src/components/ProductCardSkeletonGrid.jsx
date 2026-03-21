function ProductCardSkeleton() {
  return (
    <div className="card h-100 shadow-sm">
      <div className="placeholder-glow">
        <span
          className="placeholder col-12 rounded-top d-block"
          style={{ height: 200 }}
        />
      </div>
      <div className="card-body">
        <span className="placeholder col-9 placeholder-lg mb-2 d-block" />
        <span className="placeholder col-6 mb-3 d-block" />
        <span className="placeholder col-4 mb-3 d-block" />
        <span className="placeholder col-12 py-2 d-block" />
      </div>
    </div>
  );
}

/** @param {{ count?: number; itemColClass?: string; rowClassName?: string }} props */
export default function ProductCardSkeletonGrid({
  count = 8,
  itemColClass = 'col-lg-3 col-md-4 col-sm-6 mb-4',
  rowClassName = 'row',
}) {
  return (
    <div className={rowClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <div className={itemColClass} key={i}>
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
