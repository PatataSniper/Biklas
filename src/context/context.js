// Biklas (2021)

import React, { useReducer } from "react";
import { initialState, AuthReducer } from "./reducer";

export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// Alternative way for using context...
// Got from:
// https://soshace.com/react-user-login-authentication-using-usecontext-and-usereducer/
// Change: We changed the name from 'useAuthState' to 'useAuthContext', this was
// because, with the first name, it seemed like we were using the react method 'useState'
// when in fact we are using the method 'useContext'
// export function useAuthContext() {
//   const context = React.useContext(AuthStateContext);
//   if (context === undefined) {
//     throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
//   }

//   return context;
// }
