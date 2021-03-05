import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

export default function Home({ products }) {
  return (
    <div className="home">
      {products.map((product) => {
        return (
          <div key={product._id} className="home-map">
            <img src={product.image} alt={product.name} className="home-img" />

            <div className="home-div-content">
              <h2 className="home-name">{product.name}</h2>

              <p>
                Price: <b>{product.price} €</b>
              </p>

              <Link className="home-link" to={`/detail/${product._id}`}>
                <button className="home-button">View</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
