import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";

const ProductAdd = ({ FileInput, productService }) => {
  // const refresh = () => {
  //   window.location.replace("/");
  // };
  const history = useHistory();
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [producturl, setProductUrl] = useState([]);
  const [error, setError] = useState("");
  const onFileChange = file => {
    const fileurls = file.url;
    setProductUrl(url => {
      return [...url, { fileurls }];
    });
  };
  const onSubmit = async event => {
    event.preventDefault();
    console.log("확인", productname, price, description, producturl);
    productService
      .postProduct(productname, price, description, producturl)
      .then(() => {
        // setTimeout(refresh, 200);
        // history.push("/");
        window.location.replace("/");
      })
      .catch(setError);
  };

  // const erroralert = () => {
  //   error && alert(`${error}`);
  // };

  // useEffect(() => {
  //   erroralert();
  // }, [error]);

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
      //   return setUrl(value);
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
        <FileInput type="text" onFileChange={onFileChange} />
        <button className="form-btn">Post</button>
      </form>
    </>
  );
};

export default ProductAdd;
