import axios from "axios";
import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../redux/actions/brandActions";
import Header from "../Includes/Header";
import BrandComponent from "./BrandComponent";
import Samsung from "../../Images/samsung.jpg";
import Apple from "../../Images/apple.jpg";
import Oppo from "../../Images/oppo.png";

const BrandList = () => {
  const brands = useSelector((state) => state.allBrands.brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);
  console.log("Brands: ", brands);
  return (
    <div>
      <Header />
      <div style={{ padding: "0px 0px 20px" }}>
        <Carousel fade controls={false} indicators={false}>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
                padding: "10px 10px 0px",
              }}
              className="d-block w-100"
              src={Samsung}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ maxHeight: "300px" }}
              className="d-block w-100"
              src={Apple}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={Oppo}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <BrandComponent />
    </div>
  );
};

export default BrandList;
