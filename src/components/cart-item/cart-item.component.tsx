import { cartItem as cartItemType } from "../../contexts/cart.context";

import "./cart-item.styles.scss";

const CartItem = ({ cartItem }: { cartItem: cartItemType }) => {
  const { id, name, price, imageUrl, quantity } = cartItem;

  return (
    <div key={id} className="cart-item-container">
      <div className="cart-image">
        <img src={imageUrl} alt="" className="cart-image1" />
      </div>
      <div className="cart-item-details">
        <p>{name}</p>
        <p>
          {quantity} * ${price}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
