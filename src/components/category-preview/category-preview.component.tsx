import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./category-preview.styles.scss";

interface Item {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const CategoryPreview = ({
  title,
  products,
}: {
  title: string;
  products: Item[];
}) => {
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();

  let filteredProducts = products.slice();
  if (products.length > 4) filteredProducts = products.slice(0, 4);

  return (
    <>
      <div className="category-preview-container">
        <h2 onClick={() => navigate(`/shop/${title}`)}>{title}</h2>
        <div className="category-preview-products-container">
          {filteredProducts.map(
            ({ id, name, imageUrl, price }: Item, index1: number) => (
              <div key={index1} className="category-preview-product-container">
                <img src={imageUrl} alt="" />
                <div className="category-preview-product-button">
                  <Button
                    buttonProps={{
                      onClick: () =>
                        addItemToCart({
                          id,
                          name,
                          imageUrl,
                          price,
                          quantity: 0,
                        }),
                    }}
                    buttonType="inverted"
                  >
                    Add To Cart
                  </Button>
                </div>
                <div className="category-preview-product-footer">
                  <span>{name}</span>
                  <span>{price}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPreview;
