import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./StaticPage.css";
import { connect } from "react-redux";
import { fetchSinglePageStart } from "../../store/actions/PageAction";

class StaticPage extends Component {
  state = {
    pageData: null,
    loadingPageData: true,
    active: null,
    displayContent: null,
    currentPageTitle: null,
  };
  componentDidMount() {
    this.setState({ currentPageTitle: this.props.match.params.title });
    setTimeout(() => {
      this.props.dispatch(
        fetchSinglePageStart({ unique_id: this.props.match.params.title })
      );
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.title !== prevProps.match.params.title) {
      // call the fetch function again
      this.props.dispatch(
        fetchSinglePageStart({ unique_id: this.props.match.params.title })
      );
    }
  }

  changePage = (event, page) => {
    event.preventDefault();
    this.setState({ displayContent: page });
  };
  render() {
    const displayContent = this.props.page.pageData;

    return (
      <>
        <div className="static-page-sec">
          {displayContent.loading ? (
            "Loading..."
          ) : (
            <Container>
              <h4 className="head-title">{displayContent.data.title}</h4>
              <Row>
                <Col sm="12" md="12">
                  <div className="static-box">
                    <h5 className="text-muted">
                      Updated At:{displayContent.data.updated_at}
                    </h5>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: displayContent.data.description,
                      }}
                    ></p>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </>
    );
  }
}

const mapStateToPros = (state) => ({
  page: state.page,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(StaticPage);
