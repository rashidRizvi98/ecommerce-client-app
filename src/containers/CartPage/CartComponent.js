import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCart } from "../../redux/actions/cartAction";

const CartComponent = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.getCart);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <Row>
      <Col
        sm={8}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      ></Col>
      <Col sm={4}></Col>
    </Row>
  );
};

export default CartComponent;
