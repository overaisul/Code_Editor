import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

export const EditorComponent = () => {
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  function handleEditortheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  useEffect(() => {
    fetch("/Dracula.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEditorState({ ...editorState, theme: data });
      });
  }, []);
  return (
    <>
      {editorState.theme && (
        <Editor
          height="80vh"
          width="100%"
          defaultLanguage="javascript"
          defaultValue="//welcome to the playground"
          options={{
            fontSize: 18,
            fontFamily: "JetBrains Mono",
            minimap: {
              enabled: false,
            },
          }}
          onMount={handleEditortheme}
        />
      )}
    </>
  );
};
