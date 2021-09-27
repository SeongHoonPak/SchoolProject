import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const ProductAdd = ({ productService }) => {
  // const refresh = () => {
  //   window.location.replace("/");
  // };
  const history = useHistory();
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    productService
      .postProduct(productname, price, description)
      .then(() => {
        // setTimeout(refresh, 200);
        history.push("/");
      })
      .catch(setError);
  };

  const erroralert = () => {
    error && alert(`${error}`);
  };

  useEffect(() => {
    erroralert();
  }, [error]);

  const onChange = event => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "productname":
        return setProductname(value);
      case "price":
        return setPrice(value);
      case "description":
        return setDescription(value);
      // case "url":
      //   return setURL(value);   TODO(Seonghoon)
      default:
    }
  };

  return (
    <>
      <form className="product-form" onSubmit={onSubmit}>
        <input
          name="productname"
          type="text"
          placeholder="Edit product name"
          value={productname}
          required
          autoFocus
          onChange={onChange}
        />

        <input
          name="price"
          type="text"
          placeholder="Edit product price"
          value={price}
          required
          onChange={onChange}
        />

        <input
          name="description"
          type="text"
          placeholder="Edit product description"
          value={description}
          required
          onChange={onChange}
        />
        <button className="form-btn">Post</button>
      </form>
    </>
  );
};

export default ProductAdd;
