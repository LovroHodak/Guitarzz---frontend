import "./App.css";
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess";
import Admin from "./components/Admin";

import {API_URL} from './config'

function App() {
  let history = useHistory();

  const [products, setProducts] = useState([]);
  const [initialState, setInitialState] = useState([]);

  const [basketItems, setBasketItems] = useState(0);
  const [total, setTotal] = useState(0);

  const [thankYou, setThankYou] = useState("");
  const [orderData, setOrderData] = useState([]);

  const [warning, setWarning] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`, { withCredentials: true })
      .then((response) => {
        setProducts(response.data);
        setInitialState(response.data);
      });
  }, []);

  const handleAddToCart = (id) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = {
          ...product,
          stock: product.stock - 1,
        };
        return updatedProduct;
      }
      return product;
    });

    setProducts(newProducts);
    setBasketItems(basketItems + 1);
    setTotal(total + products[id].price);
  };

  const handleDeleteFromCart = (id) => {
    const newProducts = products.map((product) => {
      if (product.id === id) {
        const updatedProduct = {
          ...product,
          stock: product.stock + 1,
        };
        return updatedProduct;
      }
      return product;
    });

    setProducts(newProducts);
    setBasketItems(basketItems - 1);
    setTotal(total - products[id].price);
  };

  const handleOrder = () => {
    const result = products
      .filter((product) => {
        return product.stock !== initialState[product.id].stock;
      })
      .map((item) => {
        return {
          name: item.name,
          id: item.id,
          stock: initialState[item.id].stock - item.stock,
          price: (initialState[item.id].stock - item.stock) * item.price,
          oneItemPrice: item.price,
        };
      });

    setOrderData(result);
  };

  const addUserData = (e) => {
    e.preventDefault();

    let userInfo = {
      userEmail: e.target.email.value,
      userName: e.target.name.value,
      userLastName: e.target.lastname.value,
      userStreet: e.target.street.value,
      userCity: e.target.city.value,
      orderDetails: orderData,
      total: total,
    };

    let orderedDataMapJoin = orderData.map((el) => {return el.name}).join(' , ')

    axios
      .post(`${API_URL}/api/newOrder`, userInfo)
      .then(() => {
        axios
          .post(
            `${API_URL}/api/send-email`,
            {
              email: e.target.email.value,
              /* message: `THANK YOU: ${
                e.target.name.value
              }, FOR ORDERING: ${JSON.stringify(
                orderData
              )}, IN TOTAL OF: ${JSON.stringify(total)} €`, */
              orderData: JSON.stringify(orderedDataMapJoin),
              name: e.target.name.value,
              total: JSON.stringify(total),
            },

            { withCredentials: true }
          )
          .then(() => {
            console.log("send mail");
          });

        updateAllProducts();
        setBasketItems(0);
        setTotal(0);
        setInitialState(products);
        setThankYou(e.target.name.value);
        setWarning(false);
        history.push("/orderSuccess");
      })
      .catch(() => {
        setWarning(true);
      });
  };

  const updateAllProducts = () => {
    axios
      .patch(`${API_URL}/api/products`, {
        products,
      })
      .then((response) => {
        setProducts(response.data);
      });
  };

  return (
    <div className="App">
      <Navbar basketItems={basketItems} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home products={products} />;
          }}
        />
        <Route
          exact
          path="/detail/:id"
          render={(routeProps) => {
            return (
              <Detail
                {...routeProps}
                handleAddToCart={handleAddToCart}
                handleDeleteFromCart={handleDeleteFromCart}
                products={products}
              />
            );
          }}
        />
        <Route
          exact
          path="/cart"
          render={() => {
            return (
              <Cart
                handleAddToCart={handleAddToCart}
                handleDeleteFromCart={handleDeleteFromCart}
                total={total}
                products={products}
                initialState={initialState}
                handleOrder={handleOrder}
              />
            );
          }}
        />
        <Route
          exact
          path="/order"
          render={() => {
            return (
              <Order
                addUserData={addUserData}
                products={products}
                initialState={initialState}
                total={total}
                warning={warning}
              />
            );
          }}
        />
        <Route
          exact
          path="/orderSuccess"
          render={() => {
            return <OrderSuccess thankYou={thankYou} />;
          }}
        />
        <Route
          exact
          path="/admin"
          render={() => {
            return <Admin />;
          }}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
