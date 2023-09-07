import { createContext, useState, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListerner,
} from "../utils/firebase/firebase.utils";

interface UserContexState {
  [key: string]: any;
}

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: (state: UserContexState) => {},
});

//reducer
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state: any, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: {},
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //useState
  //const [currentUser, setCurrentUser] = useState({});

  //useReducer
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  const setCurrentUser = (user: any) =>
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

  //observer
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListerner((user: any) => {
      console.log(user);
      if (user === null) {
        setCurrentUser({});
      } else {
        setCurrentUser(user);
        createUserDocumentFromAuth(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
