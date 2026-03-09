import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { useEffect, useState, useContext } from "react";
import { getAllSweets } from "../api/sweetService";
import { CartContext } from "../context/CartContext";
import SweetCard from "../components/SweetCard";

/* Category Images */
import milkSweet from "../assets/categories/milk_sweets.jpg";
import dryFruit from "../assets/categories/dry_fruit_sweets.jpg";
import festival from "../assets/categories/festival_sweets.jpg";
import traditional from "../assets/categories/traditional_sweets.jpg";

/* Sweet Images */
import kajuKatli from "../assets/sweets/kaju_katli.jpg";
import gulabJamun from "../assets/sweets/gulab_jamun.jpg";
import rasgulla from "../assets/sweets/rasgulla.jpg";
import jalebi from "../assets/sweets/jalebi.jpg";

function Home() {

  const token = localStorage.getItem("token");

  const { addToCart } = useContext(CartContext);

  const [featuredSweets, setFeaturedSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Category Data */

  const categories = [
    { name: "Milk Sweets", img: milkSweet },
    { name: "Dry Fruit Sweets", img: dryFruit },
    { name: "Festival Specials", img: festival },
    { name: "Traditional Sweets", img: traditional }
  ];

  /* Best Sellers */

  const bestSellers = [
    { name: "Kaju Katli", price: 80, img: kajuKatli },
    { name: "Gulab Jamun", price: 40, img: gulabJamun },
    { name: "Rasgulla", price: 40, img: rasgulla },
    { name: "Jalebi", price: 35, img: jalebi }
  ];

  /* Sweet Image Map */

  const sweetImages = {
    "Kaju Katli": kajuKatli,
    "Gulab Jamun": gulabJamun,
    "Rasgulla": rasgulla,
    "Jalebi": jalebi
  };

  /* Load Featured Sweets */

  useEffect(() => {

    const loadFeatured = async () => {

      try {

        const data = await getAllSweets();

        const sweets = data?.content || data || [];

        setFeaturedSweets(sweets.slice(0, 4));

      } catch (error) {

        console.error("Failed to load featured sweets", error);

      } finally {

        setLoading(false);

      }

    };

    loadFeatured();

  }, []);

  return (

    <div>

      {/* HERO */}
      <HeroCarousel />


      {/* FESTIVAL OFFER */}

      <div className="container mt-4">

        <div className="alert alert-warning text-center fs-5 shadow-sm">

          🎉 <strong>Festival Special Offer</strong> – Get
          <span className="text-danger fw-bold"> 20% OFF </span>
          on all sweets!

        </div>

      </div>


      {/* CATEGORY SECTION */}

      <div className="container mt-5">

        <h2 className="text-center mb-4">Sweet Categories</h2>

        <div className="row g-4">

          {categories.map((cat) => (

            <div className="col-lg-3 col-md-6" key={cat.name}>

              <div className="card category-card shadow-sm h-100">

                <img
                  src={cat.img}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/300x200")
                  }
                />

                <div className="card-body text-center">

                  <h5>{cat.name}</h5>

                  <Link
                    className="btn btn-warning mt-2"
                    to={`/sweets?category=${cat.name}`}
                  >
                    Explore
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* FEATURED SWEETS */}

      <div className="container mt-5">

        <h2 className="text-center mb-4">⭐ Featured Sweets</h2>

        {loading ? (

          <div className="text-center">
            <div className="spinner-border text-warning"></div>
          </div>

        ) : (

          <div className="row">

            {featuredSweets.map((sweet) => {

              const image =
                sweetImages[sweet.name] ||
                "https://via.placeholder.com/300x200?text=Sweet";

              return (

                <div className="col-lg-3 col-md-6 mb-4" key={sweet.id}>

                  <SweetCard
                    sweet={sweet}
                    image={image}
                    addToCart={addToCart}
                  />

                </div>

              );

            })}

          </div>

        )}

      </div>


      {/* BEST SELLERS */}

      <div className="container mt-5">

        <h2 className="text-center mb-4">🔥 Best Selling Sweets</h2>

        <div className="row g-4">

          {bestSellers.map((sweet) => (

            <div className="col-lg-3 col-md-6" key={sweet.name}>

              <div className="card shadow-sm h-100 sweet-card">

                <img
                  src={sweet.img}
                  alt={sweet.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body text-center">

                  <h5>{sweet.name}</h5>

                  <p className="text-success fw-bold">
                    ₹{sweet.price.toLocaleString()}
                  </p>

                  <Link className="btn btn-success" to="/sweets">
                    View
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* CTA */}

      {!token && (

        <div className="container mt-5 text-center">

          <div className="card p-4 shadow-sm">

            <h4>Create an account to start ordering sweets</h4>

            <Link className="btn btn-primary mt-3" to="/register">
              Register Now
            </Link>

          </div>

        </div>

      )}

    </div>

  );

}

export default Home;