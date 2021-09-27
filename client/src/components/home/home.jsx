import React, { memo } from "react";
import { Link } from "react-router-dom";

const Home = memo(() => {
  return (
    <>
      <Link to="/productadd">
        <button>상품등록하기</button>
      </Link>
      <Link to="/productadd1">
        <button>상품등록하기111</button>
      </Link>
    </>
  );
});
export default Home;
