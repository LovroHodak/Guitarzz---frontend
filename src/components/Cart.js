import React from "react";
import "./styles/Cart.css";
import { Link } from "react-router-dom";

export default function Cart({
  products,
  initialState,
  total,
  handleAddToCart,
  handleDeleteFromCart,
  handleOrder,
}) {
  const addToCart = (product) => {
    handleAddToCart(product.id);
  };

  const deleteFromCart = (product) => {
    handleDeleteFromCart(product.id);
  };

  return (
    <div className="cart">
      <div className="cart-items">
        {products
          .filter((product) => {
            return product.stock !== initialState[product.id].stock;
          })
          .map((item) => {
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-div-img">
                  <img src={item.image} alt={item.name} className="cart-img" />
                </div>
                <div className="cart-info">
                  <h1>{item.name}</h1>

                  <p>
                    Price:{" "}
                    <b className="cart-total-b">
                      {(initialState[item.id].stock - item.stock) * item.price}
                    </b>{" "}
                    €
                  </p>
                </div>

                <div className="cart-volume">
                  <p>
                    Nr. of items:{" "}
                    <b>{initialState[item.id].stock - item.stock}</b>
                  </p>
                  <div className="cart-buttons">
                    {item.stock > 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="cart-button"
                      >
                        +
                      </button>
                    ) : (
                      <></>
                    )}

                    <button
                      onClick={() => deleteFromCart(item)}
                      className="cart-button"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {total === 0 ? (
        <div className="cart-empty">
          <h1>Your cart is empty!</h1>
        </div>
      ) : (
        <div className="cart-bottom">
          <p>
            Total: <b className="cart-total-b">{total}</b> €
          </p>
          <Link to="/order">
            <button onClick={() => handleOrder()} className="cart-order-button">
              Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
