import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  deleteFavFailure,
  deleteFavSuccess,
  fetchFavFailure,
  fetchFavSuccess,
  saveFavFailure,
  saveFavSuccess,
} from "../actions/FavAction";
import {
  DELETE_FAV_START,
  FETCH_FAV_START,
  SAVE_FAV_START,
} from "../actions/ActionConstant";

function* fetchFavAPI() {
  try {
    const response = yield api.postMethod("documents_list");
    if (response.data.success) {
      yield put(fetchFavSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(fetchFavFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchFavFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveFavAPI() {
  try {
    const inputData = yield select((state) => state.docs.saveDocs.inputData);
    const response = yield api.postMethod("documents_save", inputData);
    if (response.data.success) {
      yield put(saveFavSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveFavFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveFavFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteFavAPI() {
  try {
    const inputData = yield select((state) => state.docs.delDocs.inputData);
    const response = yield api.postMethod("documents_delete", inputData);
    if (response.data.success) {
      yield put(deleteFavSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteFavFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteFavFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_FAV_START, fetchFavAPI)]);
  yield all([yield takeLatest(SAVE_FAV_START, saveFavAPI)]);
  yield all([yield takeLatest(DELETE_FAV_START, deleteFavAPI)]);
}