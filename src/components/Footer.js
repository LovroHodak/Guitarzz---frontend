import React from "react";
import "./styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <Link style={{ textDecoration: "none", color: "white" }} to="/admin">
        <h1>Admin</h1>
      </Link>
    </div>
  );
}
