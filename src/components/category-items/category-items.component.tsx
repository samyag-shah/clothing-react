import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./category-items.styles.scss";

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const CategoryAllItems = ({ product }: { product: Item }) => {
  const { addItemToCart } = useContext(CartContext);
  const { id, name, imageUrl, price } = product;

  return (
    <>
      <div className="category-product-container">
        <img src={imageUrl} alt="" />

        <div className="category-product-footer">
          <span>{name}</span>
          <span>{price}</span>
        </div>

        <div className="category-product-button">
          <Button
            buttonProps={{
              onClick: () =>
                addItemToCart({ id, name, imageUrl, price, quantity: 0 }),
            }}
            buttonType="inverted"
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default CategoryAllItems;
