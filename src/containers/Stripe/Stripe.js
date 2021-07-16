import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = (props) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm
        user={props.user}
        address={props.address}
        totalAmount={props.totalAmount}
        items={props.items}
      />
    </Elements>
  );
};

export default Stripe;
