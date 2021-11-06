import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Area from "../components/Area/area";
const ProductRegister = ({ FileInput, productService }) => {
  const history = useHistory();
  const historyState = history.location.state
    ? history.location.state.products
    : "";
  const { id, name, description, price, area, producturl } = historyState;
  const spliturl =
    (producturl && producturl.replace(/\[|]|"/g, "").split(",")) || [];
  const [producturls, setProducturls] = useState(spliturl);
  const [error, setError] = useState("");
  const onFileChange = file => {
    producturl &&
      producturls[0] == producturl.replace(/\[|]|"/g, "").split(",") &&
      setProducturls([]);
    const fileurls = file.url;
    setProducturls(producturls => {
      return [...producturls, fileurls];
    });
  };
  const [product, setProduct] = useState({
    id,
    description,
    price,
    name,
    area,
  });
  const onSubmit = async event => {
    event.preventDefault();

    (historyState &&
      productService
        .updateProduct(product, producturls)
        .then(() => {
          history.push("/");
          console.log("업데이트 실행");
        })
        .catch(setError)) ||
      productService
        .postProduct(product, producturls)
        .then(() => {
          history.push("/");

          console.log("포스트 실행");
        })
        .catch(setError);
  };

  const onChange = event => {
    const { name, value } = event.target;
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
  const erroralert = () => {
    error && alert(`${error}`);
  };

  const onChangeArea = e => {
    const { value } = e.target;
    setProduct({ ...product, area: value });
  };

  useEffect(() => {
    erroralert();
  }, [error]);
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
        <Area onChange={onChangeArea} area={area} />
        <FileInput type="text" onFileChange={onFileChange} />

        <p>업로드 될 이미지</p>

        {producturls &&
          producturls.map(url => {
            return <img src={url} />;
          })}

        <h1>gd</h1>
        <button className="form-btn">Post</button>
      </form>
    </>
  );
};

export default ProductRegister;
