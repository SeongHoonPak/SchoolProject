import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import parseDate from "../../util/date";

const Products = memo(
  ({ product, onUsernameClick, Delete, productService }) => {
    const history = useHistory();
    const { usernamed } = useSelector(state => ({
      usernamed: state.user.username,
    }));
    const { id, username, productname, producturl, url, createdAt, one } =
      product;
    const path = "/" + id;
    const onClickid = event => {
      productService
        .getProduct(id) // id에 맞는 상품 들고오기
        .then(product => gotoProductadd(product));
    };
    const gotoProductadd = product => {
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
    const onClick = event => {
      productService
        .getProducts(id) // id에 맞는 상품 들고오기
        .then(product => gotoProductadd(product));
    };
    console.log(product);
    const owner = usernamed == username;
    return (
      <>
        <Link to={path}>
          <li className="product">
            <section className="product-container">
              {/* <Avatar url={url} name={username} /> */}
              <div className="product-body">
                <span
                  className="product-username"
                  onClick={() => onUsernameClick(product)}
                >
                  @{username}
                </span>
                <span className="product-date"> · {parseDate(createdAt)}</span>
                {producturl.map(url => {
                  return (
                    <img
                      key={Math.random()}
                      className="card-img-top"
                      src={url.fileurls}
                      alt="Card image cap"
                    />
                  );
                })}
                <p>{productname}</p>
                {owner && one && (
                  <div className="tweet-action">
                    <button className="tweet-action-btn" onClick={onDelete}>
                      x
                    </button>
                    <button className="tweet-action-btn" onClick={onClickid}>
                      ✎
                    </button>
                  </div>
                )}
              </div>
            </section>
          </li>
        </Link>
      </>
    );
  }
);
export default Products;
