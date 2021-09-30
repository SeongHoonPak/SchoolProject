import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
const ProductRegister = ({ FileInput, productService }) => {
  const history = useHistory();
  const historyState = history.location.state
    ? history.location.state.products
    : "";
  console.log("xzvavasv", historyState);
  const { id, productname, description, price, producturls } = historyState;
  const [producturl, setProducturl] = useState([]);
  const [error, setError] = useState("");

  const onFileChange = file => {
    const fileurls = file.url;
    setProducturl(producturl => {
      return [...producturl, { fileurls }];
    });
  };

  const [product, setProduct] = useState({
    id: id,
    name: productname,
    description: description,
    price: price,
    producturl: producturls,
  });
  const onSubmit = async event => {
    event.preventDefault();
    historyState
      ? productService
          .updateProduct(product)
          .then(() => {
            // setTimeout(refresh, 200);
            history.push("/");
            console.log("업데이트 실행");
            // window.location.replace("/");
          })
          .catch(setError)
      : productService
          .postProduct(product)
          .then(() => {
            // setTimeout(refresh, 200);
            history.push("/");

            console.log("포스트 실행");
            // window.location.replace("/");
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
    const { name, value } = event.target;
    console.log("name??", name, "value???", value, "상품", product);
    switch (name) {
      case "name":
        return setProduct({ ...product, [name]: value });
      case "price":
        return setProduct({ ...product, [name]: value });
      case "description":
        return setProduct({ ...product, [name]: value });
      default:
    }
  };

  useEffect(() => {
    setProduct(product => {
      return {
        ...product,
        producturl: producturl,
      };
    });
  }, [error, producturl]);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Edit product name"
          value={product.name}
          required
          autoFocus
          onChange={onChange}
        />

        <input
          name="price"
          type="text"
          placeholder="Edit product price"
          value={product.price}
          required
          onChange={onChange}
        />

        <input
          name="description"
          type="text"
          placeholder="Edit product description"
          value={product.description}
          required
          onChange={onChange}
        />
        <FileInput type="text" onFileChange={onFileChange} />
        <button className="form-btn">Post</button>
      </form>
    </>
  );
};

export default ProductRegister;
