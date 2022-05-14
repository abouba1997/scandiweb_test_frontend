import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Field from "../Field/Field";
import { addFormSchema } from "../../validation/AddFormValidation";
import "./AddForm.css";

const AddForm = () => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    productType: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const [errors, setErrors] = useState({});
  const errorsObject = {};

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await addFormSchema
      .validate(formData, { abortEarly: false })
      .then((dat) => {
        setFormData(dat);
        return true;
      })
      .catch((err) => {
        for (let index = 0; index < err.inner.length; index++) {
          const path = err.inner[index].path;
          const message = err.inner[index].message;
          errorsObject[path] = message;
        }
        setErrors(errorsObject);
        return false;
      });
      
    if (data) {
      await axios.post(
        "https://scandiwebtestphpmysql.herokuapp.com/product/create",
        formData
      )
      .then(() => {
        setFormData({
          sku: "",
          name: "",
          price: "",
          productType: "",
          size: "",
          weight: "",
          height: "",
          width: "",
          length: "",
        });
        setErrors({});
      })
      .catch(err => console.log(err));
    }
  };

  const cancelHandle = () => {
    setFormData({
      sku: "",
      name: "",
      price: "",
      productType: "",
      size: "",
      weight: "",
      height: "",
      width: "",
      length: "",
    });
    setErrors({});
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header__container">
          <div className="header__title">
            <h1>Product Add</h1>
          </div>
          <div className="header__buttons">
            <div className="header__buttons-add">
              <button type="submit" form="product_form" className="btn__submit">
                SAVE
              </button>
            </div>
            <div className="header__buttons-delete" id="delete-product-btn">
              <button className="btn__cancel" onClick={cancelHandle}>
                CANCEL
              </button>
            </div>
            <div className="header__buttons-add">
              <Link to="/">
                <button className="btn__submit">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main__form">
        <form action="" onSubmit={handleSubmit} id="product_form">
          <Field
            text={"SKU"}
            type={"text"}
            id={"sku"}
            name={"sku"}
            placeholder={"SKU..."}
            onChange={handleChange}
            value={formData.sku}
            error={errors.sku}
          />
          <Field
            text={"Name"}
            type={"text"}
            id={"name"}
            name={"name"}
            placeholder={"Product Name..."}
            onChange={handleChange}
            value={formData.name}
            error={errors.name}
          />
          <Field
            text={"Price ($)"}
            type={"number"}
            id={"price"}
            name={"price"}
            placeholder={"Product price..."}
            onChange={handleChange}
            value={formData.price}
            error={errors.price}
          />
          <div className="row">
            <div className="col-25">
              <label htmlFor="productType">Type Switcher</label>
            </div>
            <div className="col-75">
              {/* {errors.productType === 'undefined' ? '' : <span className="error__display">{errors["productType"]}</span>} */}
              <span className="error__display">{errors.productType}</span>
              <select
                name="productType"
                id="productType"
                placeholder=""
                onChange={handleChange}
                value={formData.productType}
              >
                <option value="" id="" disabled defaultValue>
                  Type Switcher
                </option>
                <option value="DVD-disc" id="DVD">
                  DVD-disc
                </option>
                <option value="Book" id="Book">
                  Book
                </option>
                <option value="Furniture" id="Furniture">
                  Furniture
                </option>
              </select>
            </div>
          </div>
          <hr />

          {/* Here goes the dynamic changing of the form (dvd-disc) */}

          {formData.productType === "DVD-disc" && (
            <div className="row__description">
              <Field
                text={"Size (MB)"}
                type={"number"}
                id={"size"}
                name={"size"}
                placeholder={"Size of DVD..."}
                onChange={handleChange}
                value={formData.size}
                error={errors.size}
              />
              <p className="row__p">
                Specify please the size of the DVD-disk in MB.
              </p>
            </div>
          )}

          {/* Here goes the dynamic changing of the form (book) */}

          {formData.productType === "Book" && (
            <div className="row__description">
              <Field
                text={"Weight (KG)"}
                type={"number"}
                id={"weight"}
                name={"weight"}
                placeholder={"Weight of Book..."}
                value={formData.weight}
                error={errors.weight}
                onChange={handleChange}
              />
              <p className="row__p">
                Specify please the weight of the book in KG.
              </p>
            </div>
          )}

          {/* Here goes the dynamic changing of the form (furniture) */}

          {formData.productType === "Furniture" && (
            <div className="row__description">
              <Field
                text={"Height (CM)"}
                type={"number"}
                id={"height"}
                name={"height"}
                placeholder={"Height..."}
                value={formData.height}
                onChange={handleChange}
                error={errors.height}
              />
              <Field
                text={"Width (CM)"}
                type={"number"}
                id={"width"}
                name={"width"}
                placeholder={"Width..."}
                value={formData.width}
                onChange={handleChange}
                error={errors.width}
              />
              <Field
                text={"Length (CM)"}
                type={"number"}
                id={"length"}
                name={"length"}
                placeholder={"Length..."}
                value={formData.length}
                onChange={handleChange}
                error={errors.length}
              />
              <p className="row__p">
                Specify please the dimensions of the furniture in centimeters
                (CM).
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddForm;
