import { createContext, useReducer, useContext } from "react";

const initialState = {
  selectedUserID: undefined,
  selectedLoanID: undefined,
  modalType: "",
};

const mainProviderReducer = (state, action) => {
  switch (action.type) {
    case "setModalType": {
      return {
        ...state,
        modalType: action.payload,
      };
    }
    case "setSelectedUserID":
      return {
        ...state,
        selectedUserID: action.payload,
      };
    case "setSelectedLoanID":
      return {
        ...state,
        selectedLoanID: action.payload,
      };
    default:
      return state;
  }
};

const MainProviderStateContext = createContext(undefined);

const MainProviderActionContext = createContext(undefined);

export const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainProviderReducer, initialState);

  const setSelectedUserID = (userID) =>
    dispatch({ type: "setSelectedUserID", payload: userID });

  const setSelectedLoanID = (loanID) =>
    dispatch({ type: "setSelectedLoanID", payload: loanID });

  const setModalType = (modalType) =>
    dispatch({ type: "setModalType", payload: modalType });

  const actions = {
    setSelectedUserID,
    setSelectedLoanID,
    setModalType,
  };

  return (
    <MainProviderStateContext.Provider value={state}>
      <MainProviderActionContext.Provider value={actions}>
        {children}
      </MainProviderActionContext.Provider>
    </MainProviderStateContext.Provider>
  );
};

export const useMainState = () => {
  const context = useContext(MainProviderStateContext);
  if (context === undefined) {
    throw new Error("useMainState must be used within a MainProvider");
  }
  return context;
};

export const useMainAction = () => {
  const context = useContext(MainProviderActionContext);
  if (context === undefined) {
    throw new Error("useMainAction must be used within a MainProvider");
  }
  return context;
};
