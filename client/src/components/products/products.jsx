import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import parseDate from "../../util/date";

const Products = memo(
  ({ product, onUsernameClick, Delete, productService, cartService }) => {
    const history = useHistory();
    const { usernamed } = useSelector(state => ({
      usernamed: state.user.username,
    }));
    const { id, username, name, producturl, createdAt, one } = product;
    const path = "/" + id;
    const [like, setLike] = useState(false);

    console.log("체크", product, "체크체크");
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
      (like &&
        cartService.deleteProduct(id).then(a => {
          console.log("delete실행완료", a);
          setLike(false);
        })) ||
        cartService.postProduct(id).then(a => {
          console.log("post실행완료", a);
          setLike(true);
        });
    };

    useEffect(() => {
      usernamed &&
        one &&
        cartService.getProducts().then(product => {
          product.map(product => product.cartproduct.id == id && setLike(true));
        });
    }, [cartService]);
    const owner = usernamed == username;
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
                <p>{name}</p>
              </div>
            </section>
          </li>
        </Link>
        {owner && one && (
          <div>
            <button onClick={onDelete}>x</button>
            <button onClick={onClickid}>✎</button>
          </div>
        )}
        {owner || (one && <button onClick={onOrder}>하숙신청</button>)}
      </>
    );
  }
);
export default Products;
