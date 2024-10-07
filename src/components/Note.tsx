import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../layout/NoteLayout";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  onDelete: (id: string) => void;
}

const Note = ({ onDelete }: Props) => {
const navigate = useNavigate()
  const note = useNote();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs={"auto"}>
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/")
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <body className="mt-3">{note.markdown}</body>
    </>
  );
};

export default Note;
