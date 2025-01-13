import "./editorbutton.css";
export const EditorButton = ({ isActive }) => {
  return (
    <button
      className="editor-button"
      style={{
        backgroundColor: isActive ? "#303242" : "#959eba",
        borderTop: isActive ? "3px solid #0219c8" : "none",
      }}
    >
      file.js
    </button>
  );
};
