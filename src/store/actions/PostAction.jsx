import {
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CHANGE_POST_STATUS_START,
  CHANGE_POST_STATUS_SUCCESS,
  CHANGE_POST_STATUS_FAILURE,
} from "./ActionConstant";

export function savePostStart(data) {
  return {
    type: SAVE_POST_START,
    data,
  };
}

export function savePostSuccess(data) {
  return {
    type: SAVE_POST_SUCCESS,
    data,
  };
}

export function savePostFailure(error) {
  return {
    type: SAVE_POST_FAILURE,
    error,
  };
}
export function fetchPostsStart(data) {
  return {
    type: FETCH_POSTS_START,
    data,
  };
}

export function fetchPostsSuccess(data) {
  return {
    type: FETCH_POSTS_SUCCESS,
    data,
  };
}

export function fetchPostsFailure(error) {
  return {
    type: FETCH_POSTS_FAILURE,
    error,
  };
}

export function fetchSinglePostStart(data) {
  return {
    type: FETCH_SINGLE_POST_START,
    data,
  };
}

export function fetchSinglePostSuccess(data) {
  return {
    type: FETCH_SINGLE_POST_SUCCESS,
    data,
  };
}

export function fetchSinglePostFailure(error) {
  return {
    type: FETCH_SINGLE_POST_FAILURE,
    error,
  };
}

export function deletePostStart(data) {
  return {
    type: DELETE_POST_START,
    data,
  };
}

export function deletePostSuccess(data) {
  return {
    type: DELETE_POST_SUCCESS,
    data,
  };
}

export function deletePostFailure(error) {
  return {
    type: DELETE_POST_FAILURE,
    error,
  };
}

export function deletePostStart(data) {
  return {
    type: CHANGE_POST_STATUS_START,
    data,
  };
}

export function deletePostSuccess(data) {
  return {
    type: CHANGE_POST_STATUS_SUCCESS,
    data,
  };
}

export function deletePostFailure(error) {
  return {
    type: CHANGE_POST_STATUS_FAILURE,
    error,
  };
}
