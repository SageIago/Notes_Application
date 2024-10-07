import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../types";

interface Props {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

const EditTagsModal = ({
  availableTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: Props) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack gap={2}>
          {availableTags.map((tags) => (
            <Row key={tags.id}>
              <Col>
                <Form.Control
                  type="text"
                  value={tags.label}
                  onChange={(e) => onUpdateTag(tags.id, e.target.value)}
                />
              </Col>
              <Col xs={"auto"}>
                <Button
                  onClick={() => onDeleteTag(tags.id)}
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Col>
            </Row>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;
