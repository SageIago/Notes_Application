import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./layout/NewNote";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
import { NoteData, RawNote, Tag } from "./types";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./layout/NoteList";
import NoteLayout from "./layout/NoteLayout";
import Note from "./components/Note";
import EditNote from "./layout/EditNote";

function App() {
  // RENDER THE NOTES FUNCTION HERE
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);

  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // CHECK THIS NOTE WITH TAGS AND FILTER WITH SPECIFIC TAGS
  const notewithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsID.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((previousNotes) => {
      return [
        ...previousNotes,
        { ...data, id: uuidV4(), tagsID: tags.map((tag) => tag.id) },
      ];
    });
  }

  // UPDATE THE NOTE FROM THE EDIT SECTION
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((previousNotes) => {
      return previousNotes.map((notes) => {
        if (notes.id === id) {
          return { ...notes, ...data, tagsID: tags.map((tag) => tag.id) };
        } else {
          return notes;
        }
      });
    });
  }

  // Delete the Note from the function
  function onDeleteNote(id: string) {
    setNotes((previousNotes) => previousNotes.filter((note) => note.id !== id));
  }

  // ADD THIS TAGS TO THE LOCAL STORAGE
  function addTag(tag: Tag) {
    setTags((previousTags) => [...previousTags, tag]);
  }

  // Delete the Tags Inside the Modal
  function DeleteTags(id: string) {
    setTags((previousTags) => previousTags.filter((Tags) => Tags.id !== id));
  }

  function UpdateTag(id: string, label: string) {
    setTags((previousTags) => {
      return previousTags.map((tags) => {
        if (tags.id === id) {
          return { ...tags, label };
        } else {
          return tags;
        }
      });
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notewithTags}
              availableTags={tags}
              onDeleteTag={DeleteTags}
              onUpdateTag={UpdateTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />

        <Route path="/:id" element={<NoteLayout notes={notewithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path={"edit"}
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
