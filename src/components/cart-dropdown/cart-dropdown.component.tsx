import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext, cartItem } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown-container">
      {cartItems.length ? (
        <>
          <div className="cart-dropdown-items-container">
            {cartItems.map(
              ({ id, name, quantity, price, imageUrl }: cartItem) => (
                <CartItem
                  key={id}
                  cartItem={{ id, name, quantity, price, imageUrl }}
                />
              )
            )}
          </div>
          <div className="cart-dropdown-button">
            <Button buttonProps={{ onClick: () => navigate("./checkout") }}>
              Go to Checkout
            </Button>
          </div>{" "}
        </>
      ) : (
        <div className="cart-dropdown-empty">Your cart is empty</div>
      )}
    </div>
  );
};

export default CartDropDown;
