import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Tabs,
  Tab,
  Dropdown,
  DropdownButton,
  Image,
  Badge,
  Media,
} from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";

const BookmarkAudio = () => {
  return (
    <div className="edit-profile">
      <Container>
        <Row>
          <BookmarkNav />
          <Col xs={12} sm={12} md={8}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>Audio</h3>
                </div>
                <div className="pull-right">
                  <Link className="bookmarks-filter" href="#">
                    <Image
                      src="assets/images/icons/sort.svg"
                      className="svg-clone"
                    />
                  </Link>
                </div>
              </div>

              <div className="bookmarks-videos">
                <div className="empty-message">
                  <span className="no-bookmarks">
                    <Image
                      src="assets/images/icons/bookmark.svg"
                      className="svg-clone"
                      width="64"
                    />
                    <p> No bookmarks yet</p>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookmarkAudio;
