import React from "react";
import {Form, Button, Image, Modal} from "react-bootstrap";

const ReportModeModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center report-modal"
        size="md"
        centered
        show={props.reportMode}
        onHide={props.closeReportModeModal}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Report Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="report-form">
                <Form>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="This content is offensive or violates ONLYFANS Terms of Services"
                        custom
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="This content contains stolen material (DMCA)"
                        custom
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="This content is spam"
                        custom
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                        type="radio"
                        id="customControlAutosizing"
                        label="Report Abuse"
                        custom
                    />
                  </Form.Group>
                </Form>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="btn btn-theme"
            >
              CANCEL
            </Button>
            <Button
              type="button"
              className="btn btn-normal"
            >
              REPORT
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ReportModeModal;
