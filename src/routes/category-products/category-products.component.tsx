import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryAllItems, {
  Item,
} from "../../components/category-items/category-items.component";
import "./category-products.styles.scss";

const CategoryProducts = () => {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState<Item[]>([]);

  useEffect(() => {
    if (category) {
      setProducts(categories[category].items);
    }
  }, [category]);

  return (
    <div className="categories-container">
      <h2>{category}</h2>
      <div className="categories-produts-container">
        {products.map((product, index) => (
          <CategoryAllItems product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
