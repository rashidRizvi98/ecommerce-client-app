import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeCart } from "../../redux/actions/cartAction";
import Header from "../Includes/Header";
import CartComponent from "./CartComponent";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Link, Redirect } from "react-router-dom";
import { store } from "../../redux/store";

const CartPage = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.getCart);
  const [changeTotal, setChangeTotal] = useState(false);
  const [total, setTotal] = useState("");

  const dispatch = useDispatch();

  console.log("Cart page", cart);
  const cartLength = cart?.cartItems?.length;
  const renderCartItems = cart?.cartItems?.map((item) => {
    const decreaseFromCart = () => {
      const quantity = item.quantity - 1;
      const product = item.product;

      axios
        .post(`http://localhost:2000/api/addtocart`, {
          user: auth.user._id,
          product,
          quantity,
        })
        .then(() => {
          dispatch(getCart(auth.user._id)).then(() => {
            setChangeTotal(!changeTotal);

            /*   console.log("new qty:", cart, "changeTotal", changeTotal); */
          });
        });
    };

    const increaseFromCart = () => {
      const quantity = item.quantity + 1;
      const product = item.product;

      axios
        .post(`http://localhost:2000/api/addtocart`, {
          user: auth.user._id,
          product,
          quantity,
        })
        .then(() => {
          dispatch(getCart(auth.user._id)).then(() => {
            setChangeTotal(!changeTotal);
          });
        });
    };

    const deleteFromCart = () => {
      const cartId = cart?._id;
      const cartItemId = item._id;

      axios
        .post(`http://localhost:2000/api/deletefromcart`, {
          cartId,
          cartItemId,
        })
        .then(() => {
          dispatch(getCart(auth.user._id)).then(() => {
            setChangeTotal(!changeTotal);
          });
        });
    };

    return (
      <Card style={{ width: "14rem" }} key={item.product._id}>
        <Card.Img
          variant="top"
          width="200px"
          height="300px"
          src={item.product.productImage}
          alt=""
        />

        <Card.Body>
          <Card.Title>{item.product.productName}</Card.Title>
          <Card.Text>{item.product.price}</Card.Text>
          <Card.Text>{item.product.description}</Card.Text>
          <Card.Text>
            <span>
              <RemoveCircleOutlineIcon
                style={{ color: "dodgerblue" }}
                onClick={decreaseFromCart}
              />
              &nbsp;
              {item.quantity}&nbsp;
              <AddCircleOutlineIcon
                style={{ color: "dodgerblue" }}
                onClick={increaseFromCart}
              />
            </span>
          </Card.Text>
          <Card.Text>
            <DeleteForeverIcon onClick={deleteFromCart} />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });

  const totalPrice = () => {
    let sum = 0;
    console.log("from total price ", cart?.cartItems?.length);
    for (let i = 0; i < cart?.cartItems?.length; i++) {
      let unitPrice =
        cart?.cartItems[i].quantity * cart?.cartItems[i].product.price;
      console.log("unit", unitPrice);
      /*   console.log("cart.cartItems[i].quantity", cart.cartItems[i].quantity); */
      sum += unitPrice;
    }

    setTotal(sum);
    console.log("total", sum);
  };

  const clearCart = () => {
    axios
      .post(`http://localhost:2000/api/clearcart`, {
        _id: cart._id,
      })
      .then(() => {
        dispatch(removeCart());
        setChangeTotal(!changeTotal);
      });
  };

  useEffect(() => {
    dispatch(getCart(auth.user._id));
    console.log("within useEffect", cart);
    totalPrice();
  }, [cartLength, changeTotal]);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col
            sm={8}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {renderCartItems}
          </Col>
          <Col sm={4}>
            <Card body>
              <h3>Price: {total}</h3>
              <Link
                className="btn btn-success"
                as={Link}
                to={"/checkout"}
                variant="primary"
              >
                CheckOut&nbsp;
                <span>
                  <CheckBoxIcon />
                </span>
              </Link>
              <br />
              <br />
              <Link
                as={Link}
                to={"/"}
                className="btn btn-primary"
                onClick={clearCart}
              >
                Clear Cart&nbsp;
                <span>
                  <RemoveShoppingCartIcon />
                </span>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
