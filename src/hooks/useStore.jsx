import { useReducer } from "react";
import { actionTypes } from "../constants.json";

const initialState = {
  currentPage: 0,
};

function reducer(state, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.SET_PAGE_NUMBER: {
      const { payload } = action;
      return {
        ...state,
        currentPage: payload,
      };
    }

    default:
      return state;
  }
}

export default function useStore() {
  const [{ currentPage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setCurrentPage = (payload) => {
    dispatch({ type: "SET_PAGE_NUMBER", payload });
  };

  return {
    currentPage,
    setCurrentPage,
  };
}
