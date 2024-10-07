import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";
import { v4 as uuidV4 } from "uuid";

interface NoteFormProps extends Partial<NoteData> {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags= [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const MarkdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setselectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // FUNCTION
    onSubmit({
      title: titleRef.current!.value,
      markdown: MarkdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                placeholder="Input A Title Here!"
                ref={titleRef}
                defaultValue={title}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <CreateableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setselectedTags((previousTags) => [...previousTags, newTag]);
                }}
                placeholder="Edit Tags"
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
        <Form.Group controlId="Markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            placeholder="Enter a Note"
            ref={MarkdownRef}
            as={"textarea"}
            rows={15}
            defaultValue={markdown}
          />
        </Form.Group>

        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Link to={".."}>
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
