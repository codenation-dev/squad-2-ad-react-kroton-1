import { toast } from "react-toastify";
import { SET_LOGS } from "./types";

const SET_LOGS_REDUX = logs => ({ type: SET_LOGS, payload: { logs } });

export const getReports = firebase => async dispatch => {
  const linkCollection = firebase.db.collection("reports");
  await linkCollection
    .get()
    .then(async querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data()) || [];
      console.log("data", data);
      await dispatch(SET_LOGS_REDUX(data));
    })
    .catch(() => {
      toast.error("Erro interno do servidor.", {
        position: toast.POSITION.TOP_LEFT
      });
    });
};
