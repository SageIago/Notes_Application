import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../types";
import NoteCard from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";

export interface SimplifiedNote {
  tags: Tag[];
  title: string;
  id: string;
}

interface NoteFormProps {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

const NoteList = ({ availableTags, notes , onDeleteTag, onUpdateTag}: NoteFormProps) => {
  const [selectedTags, setselectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalisOpen, setEditTagsModalIsOpen] =
    useState<boolean>(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>NOTES</h1>
        </Col>
        <Col xs={"auto"}>
          <Stack direction="horizontal" gap={2}>
            <Link to={"/new"}>
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                placeholder="Filter Tags"
                options={availableTags.map((tags) => {
                  return { label: tags.label, value: tags.id };
                })}
                value={selectedTags.map((tags) => {
                  return { label: tags.label, value: tags.id };
                })}
                onChange={(tags) =>
                  setselectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  )
                }
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="">
        {filteredNotes.map((notes) => (
          <Col key={notes.id}>
            <NoteCard id={notes.id} title={notes.title} tags={notes.tags} />
          </Col>
        ))}
      </Row>

      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalisOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      />
    </>
  );
};

export default NoteList;
