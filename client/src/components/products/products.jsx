import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import parseDate from "../../util/date";

const Products = memo(({ product, onUsernameClick, Delete, cartService }) => {
  const history = useHistory();
  const { usernamed } = useSelector(state => ({
    usernamed: state.user.username,
  }));
  const { id, username, name, producturl, createdAt, area, one } = product;
  const path = "/product/" + id;
  const [like, setLike] = useState(false);

  const onClickid = () => {
    history.push({
      pathname: "/productRegister",
      state: { products: product },
    });
  };
  const onDelete = useCallback(async () => {
    if (window.confirm("정말 삭제 할거야?")) {
      Delete(id);
    }
  }, []);

  const onOrder = () => {
    history.push({
      pathname: "/order",
      state: { product },
    });
  };
  const onClicklike = event => {
    (like && cartService.deleteProduct(id).then(setLike(false))) ||
      cartService.postProduct(id).then(setLike(true));
  };

  useEffect(() => {
    usernamed &&
      one &&
      cartService.getProducts().then(products => {
        products.map(product => product.id == id && setLike(true));
      });
  }, [cartService]);
  const owner = usernamed == username;
  const UrlArray = producturl.replace(/\[|]|"/g, "").split(",");

  return (
    <>
      <Link to={path}>
        {owner ||
          (usernamed &&
            one &&
            ((like && <button onClick={onClicklike}>찜삭제</button>) || (
              <button onClick={onClicklike}>찜하기</button>
            )))}
        <li className="product">
          <section className="product-container">
            <div className="product-body">
              {UrlArray.map(url => {
                return (
                  <img
                    key={Math.random()}
                    className="card-img-top"
                    src={url}
                    alt="Card image cap"
                  />
                );
              })}
            </div>
          </section>
        </li>
      </Link>
      <span
        className="product-username"
        onClick={() => onUsernameClick(product)}
      >
        @{username}
      </span>
      <span className="product-date"> · {parseDate(createdAt)}</span>

      <p>
        {name} - 거래지역 : {area}
      </p>
      {owner && one && (
        <div>
          <button onClick={onDelete}>x</button>
          <button onClick={onClickid}>✎</button>
        </div>
      )}
      {owner || (one && <button onClick={onOrder}>하숙신청</button>)}
    </>
  );
});
export default Products;
