import React from "react";
import "./Product.css";

const Product = ({ product_data, massDeleteProducts }) => {
  
  const checkedBox = (e) => {
    if(e.target.checked === true) {
      massDeleteProducts.add(product_data.product_id);
    }else {
      if(massDeleteProducts.has(product_data.product_id)) {
        massDeleteProducts.delete(product_data.product_id);
      }
    }
  };

  return (
    <label className="card">
      <input className="delete-checkbox" type="checkbox" onChange={checkedBox}/>
      <div className="card__body">
        <div className="card__body-cover">
          <p>{product_data.product_sku}</p>
          <p>{product_data.product_name}</p>
          <p>{product_data.product_price} $</p>
          {product_data.product_type === "DVD" && (
            <p>Size: {product_data.dvd_size} MB</p>
          )}
          {product_data.product_type === "Book" && (
            <p>Weight: {product_data.book_weight} KG</p>
          )}
          {product_data.product_type === "Furniture" && (
            <p>Dimension: {product_data.furniture_height}x{product_data.furniture_width}x{product_data.furniture_length}</p>
          )}
        </div>
      </div>
    </label>
  );
};

export default Product;
