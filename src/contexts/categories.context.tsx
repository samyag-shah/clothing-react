import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocument } from "../utils/firebase/firebase.utils";

export interface Categories {
  [key: string]: any;
}

interface ProductContextValue {
  categories: Categories;
  //setCategories: (data: {}) => void;
}

const initialValue: ProductContextValue = {
  categories: {},
  //setCategories: (data) => {},
};

export const CategoriesContext =
  createContext<ProductContextValue>(initialValue);

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocument();
      setCategories(categoryMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
