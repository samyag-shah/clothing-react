import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

import "./categories-preview.styles.scss";

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="categories-preview-container">
      {Object.keys(categories).map((title: string, index: number) => (
        <CategoryPreview
          key={index}
          title={title}
          products={categories[title].items}
        />
      ))}
    </div>
  );
};

export default CategoriesPreview;
