import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./containers/Access/Signin";
import Signup from "./containers/Access/Signup";
import BrandList from "./containers/Brands/BrandList";
import CartPage from "./containers/CartPage/CartPage";
import CheckOut from "./containers/CheckOut/CheckOut";
import ProductDetails from "./containers/Products/ProductDetails";
import ProductsList from "./containers/Products/ProductsList";
import PrivateRoute from "./PrivateRoute";
import { getCart } from "./redux/actions/cartAction";
import { isUserLoggedIn } from "./redux/actions/signinActions";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //component did mount or did update
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
      console.log("appppjs");

      dispatch(getCart(auth.user._id));
      console.log("appppjs2222");
    }
  }, [auth.authenticate]);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={BrandList} />
        <PrivateRoute path="/bybrand/:brandId" component={ProductsList} />
        <PrivateRoute
          path="/byproductid/:productId"
          component={ProductDetails}
        />
        <PrivateRoute path="/cartpage" component={CartPage} />
        <PrivateRoute path="/checkout" component={CheckOut} />

        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
