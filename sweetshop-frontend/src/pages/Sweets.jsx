import { useEffect, useState } from "react";
import { getAllSweets } from "../api/sweetService";

function Sweets() {

  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {

    try {

      const response = await getAllSweets();

      setSweets(response.data.content);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div>

      <h2>Available Sweets</h2>

      <div className="row">

        {sweets.map((sweet) => (

          <div className="col-md-4" key={sweet.id}>

            <div className="card p-3 mb-3">

              <h5>{sweet.name}</h5>

              <p>Category: {sweet.category}</p>

              <p>Price: ₹{sweet.price}</p>

              <p>Stock: {sweet.quantity}</p>

              <button className="btn btn-success">
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Sweets;