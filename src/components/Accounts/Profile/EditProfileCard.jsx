import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button, Image } from "react-bootstrap";
import {
  editUserDetails,
  fetchUserDetailsStart,
} from "../../../store/actions/UserAction";

const EditProfileCard = (props) => {
  const [profileInputData, setProfileInputData] = useState({});

  const [image, setImage] = useState({
    profileImage: "",
    coverImage: "",
  });

  useEffect(() => {
    if (props.profile.loading) props.dispatch(fetchUserDetailsStart());
  }, []);

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      setProfileInputData({
        ...profileInputData,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (event.currentTarget.name === "coverImage") {
        reader.onloadend = () => {
          setImage({ ...image, coverImage: reader.result });
        };
      }

      if (event.currentTarget.name === "profileImage") {
        reader.onloadend = () => {
          setImage({ ...image, profileImage: reader.result });
        };
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      {props.profile.loading ? (
        "Loading..."
      ) : (
        <div
          role="tabpanel"
          className={
            props.activeSec === "profile-card"
              ? "tab-pane fade in active"
              : "tab-pane fade"
          }
          id="Section2"
        >
          <div className="profile-post-area">
            <div className="bookmarkes-list bookmarks-right-side">
              <div className="pull-left">
                <h3>EDIT PROFILE</h3>
                <p className="small-text">CHANGE PROFILE AND COVER PHOTOS</p>
              </div>
              <div className="pull-right"></div>
            </div>
          </div>
          <div className="edit-profile-photo">
            <div className="profile large">
              <div className="cover">
                <Image
                  src={
                    image.coverImage === ""
                      ? props.profile.data.cover
                      : image.coverImage
                  }
                />

                <div className="layer">
                  <div className="loader"></div>
                </div>
                <a className="image-wrapper" href="#">
                  <Form id="coverForm" action="#">
                    <Form.Control
                      className="hidden-input"
                      id="changeCover"
                      type="file"
                      name="coverImage"
                      onChange={handleChangeImage}
                    />
                    <Form.Label
                      className="edit "
                      for="changeCover"
                      title="Change cover"
                    >
                      Upload cover image
                    </Form.Label>
                  </Form>
                </a>
              </div>
              <div className="user-info">
                <div className="profile-pic">
                  <Image
                    src={
                      image.profileImage === ""
                        ? props.profile.data.picture
                        : image.profileImage
                    }
                  />
                  <div className="layer">
                    <div className="loader"></div>
                  </div>
                  <a className="image-wrapper" href="#">
                    <Form id="profile-img" action="#">
                      <Form.Control
                        className="hidden-input"
                        id="changePicture"
                        type="file"
                        name="profileImage"
                        onChange={handleChangeImage}
                      />
                      <Form.Label
                        className="edit"
                        for="changePicture"
                        type="file"
                        title="Change picture"
                      ></Form.Label>
                    </Form>
                  </a>
                </div>
                <a className="upload-profile-picture">
                  <Form id="profilePictureForm" action="#">
                    <Form.Control
                      className="hidden-input"
                      id="changePicture"
                      type="file"
                      name="profileImage"
                      onChange={handleChangeImage}
                    />
                    <Form.Label
                      className="edit"
                      for="changePicture"
                      type="file"
                      title="Change picture"
                    >
                      Upload profile photo
                    </Form.Label>
                  </Form>
                </a>
              </div>
            </div>
            <p className="inuput-help">
              Profile images must not contain nudity or explicit material.
            </p>
          </div>
          <div
            className="edit-input-wrapper"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              Username <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                placeholder=""
                name="username"
                maxlength="24"
                className="form-control edit-reset"
              />
              <span className="edit-new-username-status">
                <Image
                  src="assets/images/icons/tick.svg"
                  className="svg-clone"
                />
              </span>
            </div>
            <p className="inuput-help">https://fansclub.com/u63484651</p>
          </div>
          <div
            className="edit-input-wrapper"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              Display name
              <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                placeholder=""
                value={props.profile.data.username}
                name="username"
                maxlength="24"
                className="form-control edit-reset"
                onChange={(event) => {
                  props.dispatch(
                    editUserDetails(
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  );
                }}
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              Subscription price ($ per month)
              <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                value="$ FREE"
                placeholder=""
                name="username"
                maxlength="24"
                className="form-control edit-reset"
              />
            </div>
            <p className="inuput-help">
              You must
              <Link to="#">Add a Bank Account or Payment Information</Link>{" "}
              before you can set your price or accept tips.
            </p>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              ABOUT <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                value="Nutrition | Motivation"
                placeholder=""
                name="username"
                maxlength="24"
                className="form-control edit-reset"
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              LOCATION <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                value=""
                placeholder="Location"
                name="username"
                maxlength="24"
                className="form-control edit-reset"
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              WEBSITE URL
              <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                value=""
                placeholder="Website URL"
                name="username"
                maxlength="24"
                className="form-control edit-reset"
              />
            </div>
          </div>
          <div
            className="edit-input-wrapper disabled"
            data-vv-delay="1000"
            data-vv-as="Username"
          >
            <Form.Label className="edit-input-label">
              AMAZON WISHLIST
              <span className="edit-input-optional">(optional)</span>
            </Form.Label>
            <div className="">
              <Form.Control
                id="edit-login"
                type="text"
                autocomplete="on"
                value=""
                placeholder="Amazon Wishlist"
                name="username"
                maxlength="24"
                className="form-control edit-reset"
              />
            </div>
          </div>
          <div className="edit-save">
            <Button className="save-btn"> Save changes </Button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(EditProfileCard);
