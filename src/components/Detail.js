import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Detail.css";
import Magnifier from "react-magnifier";

import {API_URL} from '../config'

export default function Detail({
  match,
  handleAddToCart,
  products,
  handleDeleteFromCart,
}) {
  const [product, setProduct] = useState({});
  const [initialStock, setInitialStock] = useState();

  let paramsId = match.params.id;
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${paramsId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProduct(response.data);
        setInitialStock(response.data.stock);
      });
  }, []);

  const addToCart = () => {
    handleAddToCart(product.id);
    setProduct({ ...product, stock: product.stock - 1 });
  };

  const deleteFromCart = () => {
    handleDeleteFromCart(product.id);
    setProduct({ ...product, stock: product.stock + 1 });
  };

  return (
    <div className="detail">
      <div className="detail-top">
        <div className="detail-div-img">
          <Magnifier
            src={product.image}
            alt={product.name}
            className="detail-img"
          />
        </div>

        <div className="detail-info">
          <p>
            Name: <b>{product.name}</b>
          </p>
          <p>
            Price: <b>{product.price} €</b>
          </p>
          <p>
            In Stock:{" "}
            <b>
              {products
                .filter((product) => {
                  return product._id === paramsId;
                })
                .map((item, i) => {
                  return <b key={i}>{item.stock}</b>;
                })}
            </b>
          </p>
          {products.map((item) => {
            if (item._id == paramsId && item.stock > 0) {
              return (
                <button key={item._id} onClick={addToCart}>
                  Add
                </button>
              );
            }
          })}

          {products.map((item) => {
            if (item._id === paramsId && initialStock !== item.stock) {
              return (
                <button key={item._id} onClick={deleteFromCart}>
                  Delete
                </button>
              );
            }
          })}
        </div>
      </div>
      <div className="detail-bottom">
        <p>{product.description}</p>
      </div>
    </div>
  );
}
