import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";
import { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <table className="checkout-table">
        <thead className="checkout-table-header">
          <tr className="checkout-header-row">
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ id, name, quantity, price, imageUrl }) => (
            <CheckoutItem item={{ id, name, quantity, price, imageUrl }} />
          ))}
        </tbody>
      </table>

      <div className="checkout-table-total">
        <span className="checkout-total">Total: {cartTotal}</span>
      </div>
    </div>
  );
};

export default Checkout;
