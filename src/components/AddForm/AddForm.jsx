import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Field from "../Field/Field";
import { addFormSchema } from "../../validation/AddFormValidation";
import "./AddForm.css";

const initialState = {
  sku: "",
  name: "",
  price: "",
  productType: "",
  size: "",
  weight: "",
  height: "",
  width: "",
  length: "",
};

const API_URL = "https://scandiwebtestphpmysql.herokuapp.com/";

const AddForm = () => {
  const [formData, setFormData] = useState(initialState);
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
      .catch((err) => {
        for (let index = 0; index < err.inner.length; index++) {
          const path = err.inner[index].path;
          const message = err.inner[index].message;
          errorsObject[path] = message;
        }
        setErrors(errorsObject);
      });

    setFormData(data);

    const response = await axios.post(API_URL + "product/create", formData);
    if (response.data) {
      setFormData(initialState);
    }
  };

  const cancelHandle = () => {
    setFormData(initialState);
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
            value={formData.sku}
            onChange={handleChange}
            error={errors.sku}
          />
          <Field
            text={"Name"}
            type={"text"}
            id={"name"}
            name={"name"}
            placeholder={"Product Name..."}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Field
            text={"Price ($)"}
            type={"number"}
            id={"price"}
            name={"price"}
            placeholder={"Product price..."}
            value={formData.price}
            onChange={handleChange}
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
                value={formData.productType}
                onChange={handleChange}
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
                value={formData.size}
                onChange={handleChange}
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
                onChange={handleChange}
                error={errors.weight}
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
