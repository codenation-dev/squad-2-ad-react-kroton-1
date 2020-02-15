import { toast } from "react-toastify";
import { SET_LOGS, MODIFY_LOGS } from "./types";

const SET_LOGS_REDUX = logs => ({ type: SET_LOGS, payload: { logs } });
const MODIFY_LOGS_REDUX = logs => ({
  type: MODIFY_LOGS,
  payload: { logs }
});

export const getReports = firebase => async dispatch => {
  const linkCollection = firebase.db.collection("reports");
  await linkCollection
    .get()
    .then(async querySnapshot => {
      const data =
        querySnapshot.docs.map(doc => {
          let object = doc.data();
          object = {
            ...object,
            realId: doc.id,
            date: object.date.toDate().toString()
          };
          return object;
        }) || [];
      dispatch(SET_LOGS_REDUX(data));
    })
    .catch(error => {
      toast.error("💩 Erro interno do servidor.", {
        position: toast.POSITION.TOP_LEFT
      });
    });
};

export const excludeReports = (firebase, reports) => async dispatch => {
  let database = firebase.db.collection("reports");
  for (const [key, value] of reports.entries()) {
    database
      .doc(key)
      .delete()
      .then(function() {
        dispatch(getReports(firebase));
        toast.success(`👏 Erros excluídos com sucesso`, {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .catch(function(error) {
        toast.error("💩 Erro interno do servidor.", {
          position: toast.POSITION.TOP_LEFT
        });
      });
  }
};

export const archiveReports = (
  firebase,
  map,
  showArchived
) => async dispatch => {
  let database = firebase.db.collection("reports");
  let show = !showArchived ? true : false;

  for (let [key, value] of map.entries()) {
    if (value) {
      await database
        .doc(key)
        .update({ archived: show })
        .catch(function(error) {
          toast.error(`💩 Erro interno do servidor. ${error}`, {
            position: toast.POSITION.TOP_LEFT
          });
        });
    }
  }

  dispatch(getReports(firebase));
  toast.success(
    show
      ? "👏 Erros arquivados com sucesso"
      : "👏 Erros desarquivados com sucesso",
    {
      position: toast.POSITION.TOP_LEFT
    }
  );
};
