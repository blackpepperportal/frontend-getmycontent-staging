import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  ADD_KYC_DOCUMENT_START,
  GET_KYC_DOCUMENT_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  addKycDocumentSuccess,
  addKycDocumentFailure,
  getKycDocumentSuccess,
  getKycDocumentFailure,
} from "../actions/KycDocumentAction";

function* addKycDocumentAPI() {
  try {
    const inputData = yield select(
      (state) => state.kycDocument.addKycDocInput.data
    );
    const response = yield api.postMethod("kyc_documents_save", inputData);
    yield put(addKycDocumentSuccess(response.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(addKycDocumentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(addKycDocumentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getKycDocumentAPI() {
  try {
    const response = yield api.postMethod("kyc_documents_list");
    yield put(getKycDocumentSuccess(response.data));
    if (response.data.success) {
      // Do nothing..
    } else {
      yield put(getKycDocumentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(getKycDocumentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(ADD_KYC_DOCUMENT_START, addKycDocumentAPI)]);
  yield all([yield takeLatest(GET_KYC_DOCUMENT_START, getKycDocumentAPI)]);
}
