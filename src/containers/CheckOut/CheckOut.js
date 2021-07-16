import React, { useEffect } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import Header from "../Includes/Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../redux/actions/addressActions";
import Stripe from "../Stripe/Stripe";

const CheckOut = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.getCart);
  const addresses = useSelector((state) => state.getAddresses);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [postCode, setPostCode] = useState();
  const [country, setCountry] = useState();
  const [newAddress, setNewAddress] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();

  const dispatch = useDispatch();

  const [changeTotal, setChangeTotal] = useState(false);
  const [total, setTotal] = useState("");

  const cartLength = cart?.cartItems?.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:2000/api/addaddress", {
        user: auth.user._id,
        name,
        mobileNumber,
        postCode,
        country,
        newAddress,
        city,
        province,
      })
      .then((response) => {
        alert("Added Address successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderAddressList = addresses?.userAddresses?.map((address) => {
    return (
      <Card body>
        {address.name}&nbsp;{address.mobileNumber}&nbsp;{address.postCode}&nbsp;
        {address.country}
        &nbsp;{address.newAddress}&nbsp;{address.city}&nbsp;{address.province}
      </Card>
    );
  });

  const renderAddressForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <span className="float-right">
              <CancelPresentationIcon onClick={() => setShowForm(false)} />
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                name="mobileNumber"
                type="text"
                placeholder="Mobile Number"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Post Code</Form.Label>
              <Form.Control
                name="postCode"
                type="text"
                placeholder="Post Code"
                onChange={(e) => setPostCode(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>New Address</Form.Label>
          <Form.Control
            name="newAddress"
            type="text"
            placeholder="New Address"
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Province</Form.Label>
              <Form.Control
                name="province"
                type="text"
                placeholder="Province"
                onChange={(e) => setProvince(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Button className="mx-auto" variant="primary" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    );
  };

  const renderCartItems = cart?.cartItems?.map((item) => {
    return (
      <Card style={{ width: "12rem" }} key={item.product._id}>
        <Card.Img
          variant="top"
          width="300px"
          height="300px"
          src={item.product.productImage}
          alt=""
          className="hover-zoom"
        />

        <Card.Body>
          <Card.Title>{item.product.productName}</Card.Title>
          <Card.Text>{item.product.price}</Card.Text>
          <Card.Text>{item.product.description}</Card.Text>
          <Card.Text>{item.quantity}</Card.Text>
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

  useEffect(() => {
    totalPrice();
  }, [cartLength]);

  useEffect(() => {
    dispatch(getAddresses(auth.user._id));
  }, []);

  return (
    <>
      <Header />
      <Container className="p-5">
        <Row>
          <Col sm={6}>
            <Card body>
              <Row>
                <h2 className="ml-2">Select Shipping Address</h2>
              </Row>
              <Row className="mt-3">
                <Col SM={6}>{renderAddressList}</Col>
              </Row>
            </Card>
            <Row className="mt-5">
              {!showForm ? (
                <span onClick={() => setShowForm(true)}>
                  <h4>
                    Add an address &nbsp; <AddBoxIcon />
                  </h4>
                </span>
              ) : (
                renderAddressForm()
              )}
            </Row>
            <Row className="mt-5">
              <h3>Add Card details</h3>
            </Row>
            <Row className="mt-3">
              <Stripe
                user={auth.user}
                address={addresses.userAddresses[0]}
                totalAmount={total}
                items={cart.cartItems}
              />
            </Row>
          </Col>

          <Col csm={6}>
            <Card body>
              <Row>
                <h2>Summary</h2>
              </Row>
              <Row>
                <h4>Total price :{total}</h4>
              </Row>
              <Row
                className="mt-5"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                {renderCartItems}
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckOut;
