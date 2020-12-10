import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Dropdown, Image, Media } from "react-bootstrap";
import AddFavModal from "../../helper/AddFavModal";
import SendTipModal from "../../helper/SendTipModal";
import { deleteFavStart, saveFavStart } from "../../../store/actions/FavAction";
import { connect } from "react-redux";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { saveBlockUserStart } from "../../../store/actions/UserAction";

const UserCard = (props) => {
  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const [addFav, setAddFav] = useState(false);
  const [favStatus, setFavStatus] = useState(
    props.user.is_fav_user == 1 ? "removed" : "added"
  );

  const [blockUserStatus, setBlockUserStatus] = useState(
    props.user.is_block_user == 1 ? "blocked" : "unblocked"
  );

  const closeAddFavModal = () => {
    setAddFav(false);
  };

  const removeFav = () => {
    props.dispatch(deleteFavStart({ user_id: props.user.user_id }));
  };

  const handleStar = (event, status) => {
    event.preventDefault();
    setFavStatus(status);
    props.dispatch(
      saveFavStart({
        user_id: props.user.user_id,
      })
    );
  };
  const handleBlockUser = (event, status) => {
    event.preventDefault();
    setBlockUserStatus(status);
    props.dispatch(
      saveBlockUserStart({
        user_id: props.user.user_id,
      })
    );
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      "Link to profile was copied to clipboard!"
    );
    props.dispatch(createNotification(notificationMessage));
  };

  return (
    <>
      <Col sm={12} md={6} lg={4} xs={12}>
        <div className="follower-lists">
          <div className="follower-subscription-lists">
            <div className="follower-subscription-inner">
              <Link to={`/model-profile/` + props.user.user_unique_id}>
                <div className="follower-wrapper">
                  <Image className="follower-cover" src={props.user.cover} />
                </div>
              </Link>
              <div className="follower-profile-header">
                <Link to={`/model-profile/` + props.user.user_unique_id}>
                  <span className="follower-profile-avatar">
                    <Image src={props.user.picture} className="" />
                  </span>
                </Link>
                <div className="follower-info">
                  <div className="follower-profile-status">
                    <div
                      className="follower-status-text"
                      style={{ display: "none" }}
                    >
                      Last seen
                      <span title="User Updated">{props.user.updated}</span>
                    </div>
                    <div className="follower-profile-toggle-dropdown">
                      {/* <Link to="#" className="btn dropdown-toggle btn-link">
                        <Image
                          src="assets/images/icons/vertical-dots.svg"
                          className="svg-clone vertical-dots"
                        />
                      </Link> */}

                      <Dropdown className="btn dropdown-toggle btn-link">
                        <Dropdown.Toggle
                          className="user-dropdown-dots dropdown-toggle"
                          type="button"
                          id="dropdown-basic"
                        >
                          <Image
                            src={
                              window.location.origin +
                              "/assets/images/icons/vertical-dots.svg"
                            }
                            className="svg-clone vertical-dots"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                          <CopyToClipboard
                            text={props.user.share_link}
                            onCopy={onCopy}
                          >
                            <Media as="li">
                              <Link to="#"> Copy link to profile </Link>
                            </Media>
                          </CopyToClipboard>

                          {blockUserStatus == "unblocked" ? (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleBlockUser(event, "blocked")
                                }
                              >
                                Block the user
                              </Link>
                            </Media>
                          ) : (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleBlockUser(event, "unblocked")
                                }
                              >
                                Unblock the user
                              </Link>
                            </Media>
                          )}

                          {blockUserStatus == "unblocked" ? (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleBlockUser(event, "blocked")
                                }
                              >
                                SUBSCRIBE NOW
                              </Link>
                            </Media>
                          ) : (
                            <Media as="li">
                              <Link
                                to="#"
                                onClick={(event) =>
                                  handleBlockUser(event, "unblocked")
                                }
                              >
                                UNSUBSCRIBE THE USER
                              </Link>
                            </Media>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="follower-wrapper-name">
                    <div className="follower-profile-names">
                      <div className="follower-name-row">
                        <Link
                          to={`/model-profile/` + props.user.user_unique_id}
                        >
                          <div className="follower-user-name">
                            {props.user.name}
                            <Image
                              src="assets/images/icons/verified.svg"
                              className="svg-clone m-verified"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="follower-name-row">
                        <Link
                          to={`/model-profile/` + props.user.user_unique_id}
                          className="g-user-realname__wrapper"
                        >
                          <div className="follower-user-id">
                            @{props.user.username}
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="group-follower-btns">
                      <CopyToClipboard
                        text={props.user.share_link}
                        onCopy={onCopy}
                      >
                        <Button
                          type="button"
                          className="g-btn m-rounded m-border m-icon m-icon-only m-colored has-tooltip"
                        >
                          <Image
                            src="assets/images/icons/share.svg"
                            className="svg-clone "
                          />
                        </Button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-to-lists-button">
                <div className="swiper-favorite">
                  {favStatus !== "" ? (
                    <>
                      <>
                        {favStatus === "added" ? (
                          <Link
                            type="button"
                            className="swiper-btn-fav"
                            onClick={(event) => handleStar(event, "removed")}
                          >
                            <Image
                              src="assets/images/icons/star.svg"
                              className="svg-clone my-p-icons"
                              width="12"
                            />
                            Remove to favorites
                          </Link>
                        ) : null}
                      </>
                      <>
                        {favStatus === "removed" ? (
                          <Link
                            type="button"
                            className="swiper-btn-fav"
                            onClick={(event) => handleStar(event, "added")}
                          >
                            <Image
                              src="assets/images/icons/star.svg"
                              className="svg-clone my-p-icons"
                              width="12"
                            />
                            Add to favorites
                          </Link>
                        ) : null}
                      </>
                    </>
                  ) : props.user.is_fav_user == 1 ? (
                    <Link
                      type="button"
                      className="swiper-btn-fav"
                      onClick={(event) => handleStar(event, "removed")}
                    >
                      <Image
                        src="assets/images/icons/star.svg"
                        className="svg-clone my-p-icons"
                        width="12"
                      />
                      Remove to favorites
                    </Link>
                  ) : (
                    <Link
                      type="button"
                      className="swiper-btn-fav"
                      onClick={(event) => handleStar(event, "added")}
                    >
                      <Image
                        src="assets/images/icons/star.svg"
                        className="svg-clone my-p-icons"
                        width="12"
                      />
                      Add to favorites
                    </Link>
                  )}
                </div>
              </div>
              <div className="lists-button-group post-icons">
                <Button
                  type="button"
                  className="g-btn m-rounded m-border m-profile m-with-icon"
                  onClick={() => setSendTip(true)}
                >
                  <Image
                    src="assets/images/icons/tip.svg"
                    className="svg-clone"
                  />
                  <span className="b-btn-text">Tip</span>
                </Button>
              </div>
              <div className="lists-button-group" style={{ display: "none" }}>
                <Link
                  type="button"
                  className="g-btn m-rounded m-border m-profile m-with-icon"
                >
                  <Image
                    src="assets/images/icons/subscribe.svg"
                    className="svg-clone"
                  />
                  <span className="b-btn-text">Subscribed for free</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <SendTipModal
        sendTip={sendTip}
        closeSendTipModal={closeSendTipModal}
        username={props.user.username}
        userPicture={props.user.picture}
        name={props.user.usernamee}
        post_id={null}
        user_id={props.user.user_id}
      />
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(UserCard);
