import React, { useState } from "react";

const EditProductForm = ({ product, onUpdate, onClose, FileInput }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [url, setUrl] = useState([]);
  const [error, setError] = useState("");
  const onSubmit = async event => {
    // event.preventDefault();
    // onUpdate(product.id, text);
    onClose();
  };
  const onFileChange = file => {
    const fileurls = file.url;
    setUrl(url => {
      return [...url, { fileurls }];
    });
  };
  const onChange = event => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "productname":
        return setName(value);
      case "price":
        return setPrice(value);
      case "description":
        return setDescription(value);
      default:
    }
    console.log(name, price, description);
  };

  return (
    <>
      <form className="product-form" onSubmit={onSubmit}>
        <input
          name="productname"
          type="text"
          placeholder="Edit product name"
          value={name}
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

export default EditProductForm;
