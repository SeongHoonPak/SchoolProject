import React, { memo } from "react";

const Products = memo(({ onLogout }) => {
  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
    </>
  );
});
export default Products;
