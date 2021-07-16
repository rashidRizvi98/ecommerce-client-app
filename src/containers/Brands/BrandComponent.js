import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

const BrandComponent = () => {
  const brands = useSelector((state) => state.allBrands.brands);
  console.log(brands);
  const renderList = brands.map((brand) => {
    const { _id, brandName, brandImage } = brand;

    return (
      <Link style={{ textDecoration: "none" }} to={`/bybrand/${_id}`} key={_id}>
        <div>
          <img src={brandImage} alt="" width="200px" height="200px" />
          <h3>{brandName}</h3>
        </div>
      </Link>
    );
  });

  return (
    <div
      className="alignCards"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {renderList}
    </div>
  );
};

export default BrandComponent;
