import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  console.log("localstorage: ", JSON.parse(localStorage.getItem("notes")));
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((prev) => {
      const newNotesList = [];
      for (let i = 0; i < prev.length; i++) {
        const oldNote = prev[i];
        if (oldNote.id === currentNoteId) {
          newNotesList.unshift({ ...oldNote, body: text });
        } else {
          newNotesList.push(oldNote);
        }
      }
      return newNotesList;
    });

    // Does not rearrange the notes
    // setNotes((oldNotes) =>
    //   oldNotes.map((oldNote) => {
    //     return oldNote.id === currentNoteId
    //       ? { ...oldNote, body: text }
    //       : oldNote;
    //   })
    // );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
    // console.log("notes: ", notes);
    // console.log(
    //   "notes filtered: ",
    //   notes.filter((note) => note.id !== noteId)
    // );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
