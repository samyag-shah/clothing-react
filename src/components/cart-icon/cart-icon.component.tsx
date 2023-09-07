import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "./../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const ShopCart = () => {
  const { isCartOpen, cartCount, setIsCartOpen } = useContext(CartContext);

  const handleCartDropDownState = () => setIsCartOpen(!isCartOpen);

  return (
    <div onClick={handleCartDropDownState} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <p className="cart-item-count">{cartCount}</p>
    </div>
  );
};

export default ShopCart;
