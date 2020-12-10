import React from "react";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import UserCard from "../UserCard";
import NoDataFound from "../../../NoDataFound/NoDataFound";

const FanExpiredSec = (props) => {
  return (
    <>
      <div
        role="tabpanel"
        className={
          props.activeSec === "expired-sec"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="expired"
      >
        {props.followers.loading ? (
          "Loading..."
        ) : (
          <>
            <div className="bookmarkes-list bookmarks-right-side">
              <div className="pull-left">
                <Link className="bookmarkes-list" to="#">
                  <span className="mr-2">
                    {props.followers.data.total
                      ? props.followers.data.total
                      : 0}{" "}
                  </span>{" "}
                  ACTIVE
                </Link>
              </div>
            </div>
            <Row>
              {props.followers.data.followers.length > 0 ? (
                props.followers.data.followers.map((follower) => (
                  <UserCard user={follower.otherUser} />
                ))
              ) : (
                <NoDataFound></NoDataFound>
              )}
            </Row>
          </>
        )}
      </div>
    </>
  );
};

export default FanExpiredSec;
