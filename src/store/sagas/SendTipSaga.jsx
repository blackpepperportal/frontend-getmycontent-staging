import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  sendTipStripeFailure,
  sendTipStripeSuccess,
  sendTipWalletFailure,
  sendTipWalletSuccess,
} from "../actions/SendTipAction";
import {
  SEND_TIP_BY_STRIPE_START,
  SEND_TIP_BY_WALLET_START,
} from "../actions/ActionConstant";

function* sendTipStripeAPI() {
  try {
    const response = yield api.postMethod("documents_list");
    if (response.data.success) {
      yield put(sendTipStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(sendTipStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* sendTipWalletAPI() {
  try {
    const inputData = yield select((state) => state.docs.saveDocs.inputData);
    const response = yield api.postMethod("documents_save", inputData);
    if (response.data.success) {
      yield put(sendTipWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(sendTipWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(sendTipWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SEND_TIP_BY_STRIPE_START, sendTipStripeAPI)]);
  yield all([yield takeLatest(SEND_TIP_BY_WALLET_START, sendTipWalletAPI)]);
}