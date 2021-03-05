import React from "react";
import "./styles/Order.css";

export default function Order({
  products,
  initialState,
  total,
  addUserData,
  warning,
}) {
  return (
    <div className="order">
      <div className="order-products">
        <h1 className="titles">Your Products: </h1>
        {products
          .filter((product) => {
            return product.stock !== initialState[product.id].stock;
          })
          .map((item, i) => {
            return (
              <div key={item.id}>
                <h3>
                  <i className="total-color">{i + 1}.</i> {item.name}
                </h3>
                <p>
                  Items: <b>{initialState[item.id].stock - item.stock}</b>
                </p>
                <p>
                  Price:{" "}
                  <b>
                    {(initialState[item.id].stock - item.stock) * item.price}
                  </b>{" "}
                  €
                </p>
              </div>
            );
          })}
      </div>

      <div className="order-user">
        <h1 className="titles">Your Info: </h1>
        <form onSubmit={addUserData}>
          <div className="order-div-user">
            <label>Email </label>
            <input
              className="order-input"
              name="email"
              type="text"
              placeholder="enter email"
            />
          </div>

          <div className="order-div-user">
            <label>Name </label>
            <input
              className="order-input"
              name="name"
              type="text"
              placeholder="enter name"
            />
          </div>
          <div className="order-div-user">
            <label>Lastname </label>
            <input
              className="order-input"
              name="lastname"
              type="text"
              placeholder="enter lastname"
            />
          </div>
          <div className="order-div-user">
            <label>Street </label>
            <input
              className="order-input"
              name="street"
              type="text"
              placeholder="enter street"
            />
          </div>
          <div className="order-div-user">
            <label>City </label>
            <input
              className="order-input"
              name="city"
              type="text"
              placeholder="enter city"
            />
          </div>
          <button className="order-button" type="submit">
            <b>Place Order</b>
          </button>
        </form>
        <h1 className="order-total">
          Total: <b className="total-color">{total}</b> €
        </h1>

        {warning === true ? (
          <h2 style={{ color: "red" }}>
            !!! Your information is uncomplete !!!
          </h2>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
