import React, { Component } from "react";
import {
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_ERROR,
} from "react-redux-notify";

export const getSuccessNotificationMessage = (message) => {
  return {
    message: message,
    type: NOTIFICATION_TYPE_SUCCESS,
    duration: 2000,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
  };
};

export const getErrorNotificationMessage = (message) => {
  return {
    message: message,
    type: NOTIFICATION_TYPE_ERROR,
    duration: 2000,
    canDismiss: true,
    icon: <i className="fa fa-check" />,
  };
};
