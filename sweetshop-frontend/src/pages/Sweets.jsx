import { useEffect, useState, useContext, useMemo } from "react";
import { getAllSweets } from "../api/sweetService";
import { CartContext } from "../context/CartContext";
import { useSearchParams } from "react-router-dom";
import SweetCard from "../components/SweetCard";

/* SWEET IMAGES */

import barfi from "../assets/sweets/barfi.jpg";
import basundi from "../assets/sweets/basundi.jpg";
import coconutBarfi from "../assets/sweets/coconut_barfi.jpg";
import dryFruitHalwa from "../assets/sweets/dry_fruit_halwa.jpg";
import dryFruitLadoo from "../assets/sweets/dry_fruit_ladoo.jpg";
import ghevar from "../assets/sweets/ghevar.jpg";
import gulabJamun from "../assets/sweets/gulab_jamun.jpg";
import jalebi from "../assets/sweets/jalebi.jpg";
import kajuApple from "../assets/sweets/kaju_apple_sweet.jpg";
import kajuKatli from "../assets/sweets/kaju_katli.jpg";
import kajuRoll from "../assets/sweets/kaju_roll.jpg";
import kalakand from "../assets/sweets/kalakand.jpg";
import kheer from "../assets/sweets/kheer.jpg";
import ladoo from "../assets/sweets/ladoo.jpg";
import malpua from "../assets/sweets/malpua.jpg";
import milkCake from "../assets/sweets/milk_cake.jpg";
import modak from "../assets/sweets/modak.jpg";
import mysorePak from "../assets/sweets/mysore_pak.jpg";
import paneerBarfi from "../assets/sweets/paneer_barfi.jpg";
import peda from "../assets/sweets/peda.jpg";
import pistaLadoo from "../assets/sweets/pista_ladoo.jpg";
import rabri from "../assets/sweets/rabri.jpg";
import rasgulla from "../assets/sweets/rasgulla.jpg";
import rasmalai from "../assets/sweets/rasmalai.jpg";
import shahiTukda from "../assets/sweets/shahi_tukda.jpg";
import sandesh from "../assets/sweets/sandesh.jpg";
import soanPapdi from "../assets/sweets/soan_papdi.jpg";

/* IMAGE MAP */

const sweetImages = {
  "barfi": barfi,
  "basundi": basundi,
  "coconut barfi": coconutBarfi,
  "dry fruit halwa": dryFruitHalwa,
  "dry fruit ladoo": dryFruitLadoo,
  "ghevar": ghevar,
  "gulab jamun": gulabJamun,
  "jalebi": jalebi,
  "kaju apple sweet": kajuApple,
  "kaju katli": kajuKatli,
  "kaju roll": kajuRoll,
  "kalakand": kalakand,
  "kheer": kheer,
  "ladoo": ladoo,
  "malpua": malpua,
  "milk cake": milkCake,
  "modak": modak,
  "mysore pak": mysorePak,
  "paneer barfi": paneerBarfi,
  "peda": peda,
  "pista ladoo": pistaLadoo,
  "rabri": rabri,
  "rasgulla": rasgulla,
  "rasmalai": rasmalai,
  "shahi tukda": shahiTukda,
  "sandesh": sandesh,
  "soan papdi": soanPapdi
};

function Sweets() {

  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [category, setCategory] = useState(initialCategory);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {

    try {

      const sweetsData = await getAllSweets();

      setSweets(sweetsData || []);

    } catch (error) {

      console.error("Failed to load sweets:", error);

    } finally {

      setLoading(false);

    }

  };

  /* Categories */

  const categories = useMemo(() => {
    return ["All", ...new Set(sweets.map(s => s.category))];
  }, [sweets]);

  /* Filtering */

  const filteredSweets = useMemo(() => {

    return sweets.filter((sweet) => {

      const searchMatch = sweet.name
        ?.toLowerCase()
        .includes(search.trim().toLowerCase());

      const categoryMatch =
        category === "All" || sweet.category === category;

      return searchMatch && categoryMatch;

    });

  }, [sweets, search, category]);


  if (loading) {

    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );

  }

  return (

    <div className="container mt-4">

      <h2 className="text-center mb-4">🍬 Sweet Shop</h2>

      {/* SEARCH + FILTER */}

      <div className="row mb-4">

        <div className="col-md-6">

          <input
            className="form-control"
            placeholder="🔍 Search sweets..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-3">

          <select
            className="form-select"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >

            {categories.map((cat)=>(
              <option key={cat}>{cat}</option>
            ))}

          </select>

        </div>

      </div>

      {/* SWEETS GRID */}

      <div className="sweet-grid">

        {filteredSweets.length === 0 ? (

          <div className="text-center mt-5">
            <h5>No sweets found</h5>
          </div>

        ) : (

          filteredSweets.map((sweet) => {

            const normalizedName =
              sweet.name?.toLowerCase().trim();

            const image =
              sweetImages[normalizedName];

            return (

              <SweetCard
                key={sweet.id}
                sweet={sweet}
                image={image}
                addToCart={addToCart}
              />

            );

          })

        )}

      </div>

    </div>

  );

}

export default Sweets;