import React from "react";

const Order = ({ id }) => {
  console.log("props", id);
  return (
    <>
      <input name="name" type="text" placeholder="성함" required />
      <input name="phonenumber" type="text" placeholder="연락처" required />
    </>
  );
};

export default Order;
