import axios from "axios";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeSelectedBrand,
  selectedBrand,
} from "../../redux/actions/brandActions";
import Header from "../Includes/Header";
import ProductComponent from "./ProductComponent";

const ProductsList = () => {
  const product = useSelector((state) => state.selectedBrand.products);

  const dispatch = useDispatch();
  const { brandId } = useParams();

  useEffect(() => {
    if (brandId && brandId !== "") {
      dispatch(selectedBrand(brandId));
    }

    return () => {
      dispatch(removeSelectedBrand());
    };
  }, [brandId]);

  return (
    <div>
      <Header />
      <Container className="mt-5">
        <ProductComponent />
      </Container>
    </div>
  );
};

export default ProductsList;
