import banner4 from '../assets/images/banner4.png';
import banner5 from '../assets/images/banner5.png';

const BannerCarousel = () => {
  const banners = [banner4, banner5]; 

  return (
    <div
      id="mainBanner"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            data-bs-target="#mainBanner"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
          ></button>
        ))}
      </div>
      <div className="carousel-inner rounded">
        {banners.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img src={img} className="d-block w-100" alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainBanner"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainBanner"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default BannerCarousel;