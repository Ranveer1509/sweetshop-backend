import { Link } from "react-router-dom";

import kajuKatli from "../assets/sweets/kaju_katli.jpg";
import rasmalai from "../assets/sweets/rasmalai.jpg";
import gulabJamun from "../assets/sweets/gulab_jamun.jpg";

function HeroCarousel() {

  const slides = [
    {
      id: 1,
      image: kajuKatli,
      title: "Festival Special",
      text: "Get 20% OFF on all sweets"
    },
    {
      id: 2,
      image: rasmalai,
      title: "Fresh Indian Sweets",
      text: "Traditional taste you will love"
    },
    {
      id: 3,
      image: gulabJamun,
      title: "Premium Sweet Collection",
      text: "Luxury sweets for special occasions"
    }
  ];

  return (

    <div
      id="heroCarousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="3500"
    >

      {/* Indicators */}

      <div className="carousel-indicators">

        {slides.map((slide, i) => (

          <button
            key={slide.id}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            aria-label={`Slide ${i + 1}`}
          ></button>

        ))}

      </div>


      {/* Slides */}

      <div className="carousel-inner">

        {slides.map((slide, index) => (

          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >

            <img
              src={slide.image}
              className="d-block w-100"
              alt={slide.title}
              style={{
                height: "420px",
                objectFit: "cover",
                filter: "brightness(75%)"
              }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/1200x420?text=Sweet+Shop")
              }
            />

            <div className="carousel-caption text-center">

              <h2 className="fw-bold">{slide.title}</h2>

              <p className="fs-5">{slide.text}</p>

              <Link to="/sweets" className="btn btn-warning mt-2">
                Shop Now
              </Link>

            </div>

          </div>

        ))}

      </div>


      {/* Controls */}

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >

        <span className="carousel-control-prev-icon"></span>

      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >

        <span className="carousel-control-next-icon"></span>

      </button>

    </div>

  );

}

export default HeroCarousel;