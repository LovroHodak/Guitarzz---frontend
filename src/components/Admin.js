import React, { useEffect, useState } from "react";
import "./styles/Admin.css";
import axios from "axios";
import {API_URL} from '../config'

export default function Admin() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/orders`, { withCredentials: true })
      .then((response) => {
        setOrders(response.data);
      });
  }, []);
  return (
    <div className="admin">
      {orders
        .map((order, i) => {
          return (
            <div key={i} className="admin-order">
              <div className="admin-left">
                <h3>{i + 1}.</h3>
                <p>Created at: {order.createdAt}</p>
                <p>
                  Email: <b>{order.userEmail}</b>
                </p>
                <p>
                  Customer:{" "}
                  <b>
                    {order.userName} {order.userLastName}
                  </b>
                </p>
                <p>
                  Street: <b>{order.userStreet}</b>
                </p>
                <p>
                  City: <b>{order.userCity}</b>
                </p>
              </div>
              <div className="admin-right">
                <h2 className="colorz">Ordered items: </h2>
                {order.orderDetails.map((detail, i) => {
                  return (
                    <div key={i} className="admin-product">
                      <p>
                        <b className="colorz">{detail.stock} x</b>{" "}
                        <b>{detail.name}</b>
                      </p>
                      <p>
                        <b>{detail.price}</b> €
                      </p>
                    </div>
                  );
                })}
                <h1>
                  Total: <b className="colorz">{order.total}</b> €
                </h1>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
}
