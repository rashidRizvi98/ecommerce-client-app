import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../redux/actions/cartAction";
import { Redirect, useHistory } from "react-router-dom";

export const CheckoutForm = (props) => {
  const cart = useSelector((state) => state.getCart);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  let history = useHistory();

  const clearCart = () => {
    axios
      .post(`http://localhost:2000/api/clearcart`, {
        _id: cart._id,
      })
      .then(() => {
        dispatch(removeCart());
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      //send token to backend here

      const { id } = paymentMethod;
      const response = await axios.post("http://localhost:2000/api/addorder", {
        user: props.user,
        address: props.address,
        totalAmount: props.totalAmount,
        items: props.items,
        id: id,
      });

      clearCart();
      alert("Your order is Successfull");
      history.push("/");
    } else {
      console.log(error.message);
    }
  };

  return (
    <Card body style={{ width: "500px" }}>
      <Row>
        <Col>
          <form className="form col-sm-8" onSubmit={handleSubmit}>
            <CardElement className="form-group" style={{ width: "300px" }} />
            <br />
            <button className="btn btn-success">Pay</button>
          </form>
        </Col>
      </Row>
    </Card>
  );
};
