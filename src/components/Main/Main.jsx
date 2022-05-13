import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../Product/Product";
import "./Main.css";

const API_URL = "https://scandiwebtestphpmysql.herokuapp.com/";

const Main = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [massDeleteChange, setMassDeleteChange] = useState(false);
  const [deleted, setDeleted] = useState(new Set());

  useEffect(() => {
    return async () => {
      await axios
        .get(API_URL + "products")
        .then((response) => setProducts(response.data));
      };
  }, [massDeleteChange]);

  const massDeleteHandle = async () => {
    setMassDeleteChange((prevState) => !prevState);

    if (location === "/") {
      setDeleted(new Set());
    }
    // send the delete request to the database
    const myData = Object.assign({}, Array.from(deleted));
    await axios.post(API_URL + "products/delete", myData);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header__container">
          <div className="header__title">
            <h1>Product list</h1>
          </div>
          <div className="header__buttons">
            <div className="header__buttons-add">
              <Link to="/addproduct">
                <button className="btn__submit">ADD</button>
              </Link>
            </div>
            <div className="header__buttons-delete">
              <button
                className="btn__cancel"
                id="delete-product-btn"
                onClick={massDeleteHandle}
              >
                MASS DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        {products.length ? products.map((product, index) => (
          <Product
            product_data={product}
            key={index}
            massDeleteProducts={deleted}
          />
        )): "No retrieving data..."}
      </div>
      <div className="footer">
        <p className="footer__message">Scandiweb Test assignment</p>
      </div>
    </div>
  );
};

export default Main;
