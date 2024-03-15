/* eslint-disable react/prop-types */
export default function Sidebar(props) {
  const noteTitle = (str) => {
    if (str.startsWith("#")) {
      str = str.substring(1);
    }
    return str.split("\n")[0];
  };
  const noteElements = props.notes.map((note) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{noteTitle(note.body)}</h4>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)}
        >
          <i
            className={`gg-trash trash-icon ${
              note.id === props.currentNote.id ? "trash-white" : "trash-blue"
            }`}
          ></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
