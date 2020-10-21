import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchSubscriptionSuccess,
  fetchSubscriptionFailure,
  fetchMySubscriptionSuccess,
  fetchMySubscriptionFailure,
  fetchSingleSubscriptionSuccess,
  fetchSingleSubscriptionFailure,
  subscriptionPaymentSuccess,
  subscriptionPaymentFailure,
  subscriptionAutoRenewalSuccess,
  subscriptionAutoRenewalFailure,
} from "../actions/SubscriptionAction";

import api from "../../Environment";
import {
  FETCH_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_START,
  SUBSCRIPTION_PAYMENT_START,
  SUBSCRIPTION_AUTO_RENEWAL_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

function* getSubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_index");
    yield put(fetchSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getMySubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_history");
    yield put(fetchMySubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchMySubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getSingleSubscriptionAPI() {
  try {
    const subscriptionInputData = yield select(
      (state) => state.subscriptions.singleSubInputData.data
    );
    console.log("subsc", subscriptionInputData);
    const response = yield api.postMethod(
      "subscriptions_view",
      subscriptionInputData
    );
    yield put(fetchSingleSubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleSubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subscriptionPayment.inputData
    );
    const response = yield api.postMethod(
      "subscriptions_payment_by_card",
      subscriptioDetails
    );
    yield put(subscriptionPaymentSuccess(response.data.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      window.location.assign("/user/purchase/history");
    } else {
      yield put(subscriptionPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionAutoRenewalAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subscriptionRenew.inputData
    );
    const response = yield api.postMethod(
      "subscriptions_autorenewal_status",
      subscriptioDetails
    );
    yield put(subscriptionAutoRenewalSuccess(response.data.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(subscriptionAutoRenewalFailure(response.data.error));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionAutoRenewalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SUBSCRIPTION_START, getSubscriptionAPI)]);
  yield all([
    yield takeLatest(FETCH_MY_SUBSCRIPTION_START, getMySubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_SUBSCRIPTION_START, getSingleSubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(SUBSCRIPTION_PAYMENT_START, subscriptionPaymentAPI),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_AUTO_RENEWAL_START,
      subscriptionAutoRenewalAPI
    ),
  ]);
}
