import * as yup from "yup";

export const addFormSchema = yup.object().shape({
  sku: yup.string().required("Please, provide the sku"),
  name: yup.string().required("Please, provide the name"),
  price: yup.number().min(0).typeError('Please, provide the price'),
  productType: yup.string().required("Please, provide the type of the product"),
  size: yup.string().when("productType", {
    is: "DVD",
    then: yup.string().required("Please, provide the size of the dvd"),
  }),
  weight: yup.string().when("productType", {
    is: "Book",
    then: yup.string().required("Please, provide the weight of the book"),
  }),
  height: yup.string().when("productType", {
    is: "Furniture",
    then: yup
      .string()
      .required("Please, provide the height of the furniture"),
  }),
  width: yup.string().when("productType", {
    is: "Furniture",
    then: yup
      .string()
      .required("Please provide the width of the furniture (CM)"),
  }),
  length: yup.string().when("productType", {
    is: "Furniture",
    then: yup
      .string()
      .required("Please provide the length of the furniture (CM)"),
  }),
});
