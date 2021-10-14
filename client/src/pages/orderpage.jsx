import React from "react";
import { useHistory } from "react-router";
import Order from "../components/order/order";

const Orderpage = () => {
  const history = useHistory();
  return (
    <>
      <Order id={history.location.state.products} />
    </>
  );
};

export default Orderpage;
