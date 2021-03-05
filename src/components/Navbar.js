import React from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ basketItems }) {
  return (
    <div className="navbar">
      <h1 className="navbar-info">Info</h1>
      <Link to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSop6suReRaIfINd-3HAcAFv6COrVU5E9-Rzg&usqp=CAU"
          alt="logo"
          className="navbar-logo"
        />
      </Link>
      <div className="navbar-cart">
        <h1>
          <Link className="navbar-link" to="/cart">
            Cart ({basketItems})
          </Link>
        </h1>
      </div>
    </div>
  );
}
