import history from "../config/history";
import * as ROUTES from "../constants/routes";
import { toast } from "react-toastify";

export const login = async (firebase, data) => {
  let response = false;

  await firebase
    .doSignInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      response = true;
      history.push(ROUTES.HOME);
      toast.success("Login realizado com sucesso!", {
        position: toast.POSITION.TOP_LEFT
      });
    })
    .catch(() => {
      response = false;
      toast.error("Login e/ou senha inválidos.", {
        position: toast.POSITION.TOP_LEFT
      });
    });
  return response;
};
