import CategoriesPreview from "../categories-preview/categories-preview.component";
import CategoryProducts from "../category-products/category-products.component";

import { Routes, Route } from "react-router-dom";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<CategoryProducts />} />
    </Routes>
  );
};

export default Shop;
