import { useState, useEffect } from "react";
import auth from "./auth";

const initialState = { authenticated: false, error: null, loading: true };

const useIsAuthenticatedUserEncuestaPublic = (isPublic) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    auth
      .login("44444444", "44444444")
      .then((authenticated) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          authenticated,
        }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      });
  }, []);
  return state;
};

export default useIsAuthenticatedUserEncuestaPublic;
