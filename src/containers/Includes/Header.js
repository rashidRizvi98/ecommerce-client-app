import React, { useEffect } from "react";
import { Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../redux/actions/signinActions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.getCart);
  const [totalItems, setTotalItems] = useState();

  const signoutOnClick = () => {
    dispatch(signout());
  };

  const totalCartItems = () => {
    let total = 0;
    for (let i = 0; i < cart?.cartItems?.length; i++) {
      let unitItems = cart.cartItems[i].quantity;

      total += unitItems;
    }

    setTotalItems(total);
  };

  useEffect(() => {
    totalCartItems();
  }, [totalCartItems]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ background: "black", opacity: "0.8" }}
      variant="dark"
    >
      <Navbar.Brand as={Link} to="/" className="ml-5 pl-5">
        Rashid Mobiles
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
          </Form>
          <Nav.Link as={Link} to={"/cartpage"} className="ml-5">
            <span>
              <ShoppingCartIcon />
              {totalItems}
            </span>
          </Nav.Link>
          <Nav.Link as={Link}></Nav.Link>
        </Nav>
        <Nav>
          {auth.authenticate ? (
            <Nav.Link onClick={signoutOnClick}>Sign Out</Nav.Link>
          ) : (
            <>
              <Nav.Link as={Link} to="/signin">
                Sign in
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
