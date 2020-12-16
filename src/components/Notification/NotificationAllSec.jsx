import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import NoDataFound from "../NoDataFound/NoDataFound";

const NotificationAllSec = (props) => {
  const { notifications } = props;

  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "notify-all-sec"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section1"
      >
        <h3 className="notify-title">ALL</h3>
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div className="notify-item">
                <div className="post-header">
                  <div className="alignleft">
                    <Link
                      className="title-container"
                      to={notification.action_url}
                    >
                      <Image
                        src={notification.from_userpicture}
                        className="user-image img-responsive notification-user-img "
                      />
                      <div className="user-name">
                        <span className="post-user-name">
                          {notification.from_displayname}
                          <span className="user-id">
                            <Link
                              to={`/m-profile/` + notification.from_username}
                            >
                              @{notification.from_username}
                            </Link>
                          </span>
                        </span>
                        <span className="post-user-notify">
                          {notification.message}
                        </span>
                        <span className="post-user-notify-date">
                          {notification.updated_formatted}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoDataFound></NoDataFound>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationAllSec;
