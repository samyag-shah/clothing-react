import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import "./navigation.styles.scss";
import { ReactComponent as CrownLogo } from "./../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import ShopCart from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  //console.log({ currentUser });
  const user = Object.keys(currentUser).length;

  const signOutHandler = async () => {
    await signOutUser();
    //setCurrentUser({});
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-logo-container">
          <Link to="/">
            <CrownLogo />
          </Link>
        </div>
        <div className="navbar-links-container">
          <Link className="navbar-link" to="/shop">
            SHOP
          </Link>
          <Link className="navbar-link" to="/">
            CONTACT
          </Link>
          {user ? (
            <span className="navbar-link" onClick={signOutHandler}>
              SIGNOUT
            </span>
          ) : (
            <Link className="navbar-link" to="/auth">
              SIGNIN
            </Link>
          )}
          <div className="navbar-cart-icon">
            <ShopCart />
            {isCartOpen && <CartDropDown />}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
