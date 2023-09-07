import { CategoryItems } from "../categories/categories.component";
import "./category-item.styles.scss";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category }: { category: CategoryItems }) => {
  const navigate = useNavigate();

  const CapitalizeTitle =
    category.title.charAt(0).toUpperCase() +
    category.title.slice(1, category.title.length);

  return (
    <div
      onClick={() => navigate(`./shop/${CapitalizeTitle}`)}
      className="category-item-container"
    >
      {/* <div
          className="category-img"
          style={{ backgroundImage: `url(${category.imageUrl})` }}
        /> */}
      <img className="category-img" src={category.imageUrl} alt="" />
      <div className="category-body-container">
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
