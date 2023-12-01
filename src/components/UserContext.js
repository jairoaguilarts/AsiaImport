import React, { createContext, useContext, useReducer } from "react";

const actionTypes = {
  UPDATE_USER_STATE: "UPDATE_USER_STATE",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    isAdmin: false,
    isLoggedIn: false,
    userId: null,
  });

  const updateUserState = (payload) => {
    dispatch({
      type: actionTypes.UPDATE_USER_STATE,
      payload,
    });
  };

  return (
    <UserContext.Provider value={{ ...userState, updateUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext debe ser utilizado dentro de un UserProvider"
    );
  }
  return context;
};
