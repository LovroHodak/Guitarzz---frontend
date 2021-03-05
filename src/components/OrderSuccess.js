import React from "react";

export default function OrderSuccess({ thankYou }) {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "brown" }}>
        Thank you {thankYou} for your order!
      </h1>
    </div>
  );
}
