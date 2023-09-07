import { createContext, useReducer, useState } from "react";

export interface cartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const addCartItem = (cartItems: cartItem[], productToAdd: cartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: cartItem[], cartItemToRemove: cartItem) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: cartItem[], cartItemToClear: cartItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

interface Cart {
  isCartOpen: boolean;
  setIsCartOpen: (data: boolean) => void;
  cartItems: cartItem[];
  addItemToCart: (item: cartItem) => void;
  removeItemFromCart: (item: cartItem) => void;
  clearItemFromCart: (item: cartItem) => void;
  cartCount: number;
  cartTotal: number;
}

const initialCartValue: Cart = {
  isCartOpen: false,
  setIsCartOpen: (data: boolean) => {},
  cartItems: [],
  addItemToCart: (item: cartItem) => {},
  removeItemFromCart: (item: cartItem) => {},
  clearItemFromCart: (item: cartItem) => {},
  cartCount: 0,
  cartTotal: 0,
};

export const CartContext = createContext<Cart>(initialCartValue);

//reducer
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEM: "SET_CART_ITEMS",
};

const cartReducer = (state: any, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, ...payload };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //useState
  //   const [isCartOpen, setIsCartOpen] = useState(false);
  //   const [cartItems, setCartItems] = useState<cartItem[]>([]);

  //useReducer
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartCount, cartTotal, isCartOpen, cartItems } = state;

  const updateCartItemsReducer = (cartItems: cartItem[]) => {
    const newCartItemCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartItemTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEM,
      payload: {
        cartItems,
        cartCount: newCartItemCount,
        cartTotal: newCartItemTotal,
      },
    });
  };

  const addItemToCart = (productToAdd: cartItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (cartItemToRemove: cartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear: cartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isCartOpen: boolean) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
      payload: {
        isCartOpen,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
