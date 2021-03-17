import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Row, Col,Image } from "react-bootstrap";
import ImageLoader from "../../helper/ImageLoader";

import {
    fetchUserDetailsStart,
    updateUserDetailsStart,
    userCategoryUpdateStart,
} from "../../../store/actions/UserAction";

const UserCategoriesIndex = (props) => {
    const [inputData, setInputData] = useState({});

  useEffect(() => {
    if (props.profile.loading) props.dispatch(fetchUserDetailsStart());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(userCategoryUpdateStart(inputData));
  };

  const handleSubCategory = ({ currentTarget: input }) => {
    if (input.type === "checkbox") {
      if (input.checked) {
        if (inputData.u_category_id === undefined) {
          let array = [];
          const value = parseInt(input.value);
          array.push(value);
          setInputData({ ...inputData, u_category_id: array });
          //   inputData.sub_category_id = array;
          //   this.setState({ formData });
        } else {
          const value = parseInt(input.value);
          let tempVar = inputData.u_category_id;
          tempVar.push(value);
          setInputData({ ...inputData, u_category_id: tempVar });
        }
      } else {
        const value = parseInt(input.value);
        let index = inputData.u_category_id.indexOf(value);
        if (index !== -1) {
          let tempVar = inputData.u_category_id;
          tempVar.splice(index, 1);
          setInputData({ ...inputData, u_category_id: tempVar });
        }
      }
    }
    console.log(inputData);
    // setInputData({ ...inputData, sub_category_id: input.value });
  };

  return (
    <div className="card-list-sec">
      <Container>
        <h4 className="head-title">Categories</h4>
        <Row>
          <Col sm={12} md={12}>
            <div className="add-bank-box">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formHorizontalNickname">
                <Form.Label>Categories</Form.Label>
                {["checkbox"].map((type) => (
                    <div key={`custom-inline-${type}`}>
                        {props.profile &&
                        props.profile.data.categories &&
                        props.profile.data.categories.length > 0 ? (
                        props.profile.data.categories.map((category) => (

                            <div type="rounded" className="check-btn-sec">
                                <input
                                type="checkbox"
                                id={"category" + category.u_category_id}
                                value={category.u_category_id}
                                name={category.u_category_id}
                                onChange={handleSubCategory}
                                defaultChecked={category.is_selected == 1 ? true : false}
                                />
                                <label
                                htmlFor={"category" + category.u_category_id}
                                >
                                <div className="categories-item">
                                    <div className="overlay-slider"></div>
                                    <ImageLoader
                                    image={category.picture}
                                    alt="user-image"
                                    className="categories-img"
                                    />
                                    <p className="categories-title">
                                    {category.name}
                                    </p>
                                </div>
                                <Image
                                    src={
                                    window.location.origin +
                                    "/assets/images/checked.svg"
                                    }
                                    alt="user-image"
                                    className="checked-img"
                                />
                                </label>
                            </div>

                        ))
                        ) : ''}
                    </div>
                ))}
                </Form.Group>
                <div className="edit-save">
                  <Button
                    className="save-btn"
                    type="submit"
                    disabled={props.profileInputData.buttonDisable}
                  >
                    {props.profileInputData.loadingButtonContent !== null
                        ? props.profileInputData.loadingButtonContent
                        : "Submit"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  profileInputData: state.users.profileInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(UserCategoriesIndex);
