import axios from "axios";

import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCart } from "../../redux/actions/cartAction";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../../redux/actions/productActions";
import BrandComponent from "../Brands/BrandComponent";
import Header from "../Includes/Header";

const ProductDetails = () => {
  const product = useSelector((state) => state.selectedProduct);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.getCart);
  const {
    _id,
    productName,
    price,
    quantity,
    description,
    productImage,
    brandId,
  } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && productId !== "") {
      dispatch(selectedProduct(productId));
    }

    dispatch(getCart(auth.user._id));

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  console.log("Product:   ", product);

  const addToCart = () => {
    console.log("cart", cart);
    console.log("cartItems", cart.cartItems);
    const existingCart = cart.cartItems;
    const productAvailable =
      existingCart &&
      existingCart.length > 0 &&
      existingCart.filter(
        (items) => items.product && items.product._id === productId
      );
    console.log(" productAvailable", productAvailable);
    const quantity =
      productAvailable && productAvailable.length > 0
        ? productAvailable[0]["quantity"] + 1
        : 1;
    console.log("quantity", quantity);
    axios
      .post(`http://localhost:2000/api/addtocart`, {
        user: auth.user._id,
        product,
        quantity,
      })
      .then(() => {
        dispatch(getCart(auth.user._id));
      });

    /*  const cartObject = {
      product,
      quantity: 1,
    };
    var cart = [];
    var existingCart = [];
    existingCart = JSON.parse(localStorage.getItem("cart"));
    console.log("existingCart", existingCart);
    var productExists;
    if (existingCart && existingCart.length > 0) {
      productExists = existingCart.findIndex(
        (eItem) => eItem.product._id === productId
      );
    }
    console.log("productExists", productExists);
    if (productExists !== undefined && productExists !== -1) {
      existingCart[productExists]["quantity"] += 1;
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else if (existingCart && existingCart.length > 0) {
      cart = [...existingCart, cartObject];

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart[0] = cartObject;
      localStorage.setItem("cart", JSON.stringify(cart));
    } */
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col sm={6} className="card pt-5">
            <Card style={{ width: "18rem" }} className="mx-auto">
              <Card.Img
                variant="top"
                style={{
                  width: "200px",
                  height: "300px",
                }}
                className="mx-auto mt-4"
                src={productImage}
                alt=""
              />
              <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>{price}</Card.Text>
                <Card.Text>{quantity}</Card.Text>
                <Card.Text>{description}</Card.Text>
                <Link
                  style={{ textDecoration: "none" }}
                  as={Link}
                  to={"/cartpage"}
                  variant="primary"
                  onClick={addToCart}
                >
                  Add To Cart
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card body>
              <Row className="mb-4">
                <h3 className="h3">Browse by brands</h3>
              </Row>

              <Row>
                <Col>
                  <BrandComponent />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
