import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductComponent = () => {
  const products = useSelector((state) => state.selectedBrand.products);
  console.log("producrList", products);
  const renderList = products.map((product) => {
    const { _id, productName, price, quantity, description, productImage } =
      product;

    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/byproductid/${_id}`}
        key={_id}
      >
        <div style={{ width: "18rem" }}>
          <img src={productImage} alt="" width="200px" height="300px" />
          <h3>{productName}</h3>
          {/* <h3>{price}</h3>
          <h3>{quantity}</h3>
          <h3>{description}</h3> */}
        </div>
      </Link>
    );
  });

  return <div className="alignCards">{renderList}</div>;
};

export default ProductComponent;
