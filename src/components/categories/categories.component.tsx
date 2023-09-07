import CategoryItem from "../category-item/category-item.component";

import "./categories.styles.scss";

export interface CategoryItems {
  id: number;
  title: string;
  imageUrl: string;
}

const Categories = ({ categories }: { categories: CategoryItems[] }) => {
  return (
    <div className="categories-container">
      {categories.map((category: CategoryItems) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
