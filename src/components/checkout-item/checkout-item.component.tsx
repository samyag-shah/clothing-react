import { CartContext, cartItem } from "../../contexts/cart.context";
import { useContext } from "react";

import { ReactComponent as Close } from "./../../assets/close.svg";
import { ReactComponent as LeftArrow } from "./../../assets/chevron_left.svg";
import { ReactComponent as RightArrow } from "./../../assets/chevron_right.svg";

const CheckoutItem = ({ item }: { item: cartItem }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const { id, name, quantity, price, imageUrl } = item;

  //update quantity
  const updateQuantity = (item: cartItem, type: "increment" | "decrement") => {
    if (type === "increment") {
      addItemToCart(item);
    } else {
      removeItemFromCart(item);
    }
  };

  //remove item
  const removeCartItem = (item: cartItem) => clearItemFromCart(item);

  return (
    <tr key={id} className="checkout-body-row">
      <td>
        <div className="checkout-image-container">
          <img className="checkout-image" src={imageUrl} alt="" />
        </div>
      </td>
      <td>{name}</td>
      <td>
        <div className="checkout-quantity-container">
          <LeftArrow
            onClick={() =>
              updateQuantity(
                { id, name, quantity, price, imageUrl },
                "decrement"
              )
            }
            className="checkout-quantity-svg"
          />
          {quantity}
          <RightArrow
            onClick={() =>
              updateQuantity(
                { id, name, quantity, price, imageUrl },
                "increment"
              )
            }
            className="checkout-quantity-svg"
          />
        </div>
      </td>
      <td>{price}</td>
      <td>
        <Close
          className="checkout-remove-svg"
          onClick={() =>
            removeCartItem({ id, name, quantity, price, imageUrl })
          }
        />
      </td>
    </tr>
  );
};

export default CheckoutItem;
