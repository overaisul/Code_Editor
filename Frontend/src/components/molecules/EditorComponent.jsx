import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useEditorSocketStore } from "../../stores/editorSocketStore";
import { useActiveFileTabStore } from "../../stores/activeFileTabStore";

export const EditorComponent = () => {
  const [editorState, setEditorState] = useState({
    theme: null,
  });

  const { activeFileTab, setActiveFileTab } = useActiveFileTabStore();

  const { editorSocket } = useEditorSocketStore();

  function handleEditortheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  useEffect(() => {
    if (editorSocket) {
      editorSocket.on("readFileResponse", (data) => {
        console.log(data);
        setActiveFileTab(data.path, data.value);
      });
    }
  }, [editorSocket]);

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
          defaultLanguage={undefined}
          options={{
            fontSize: 18,
            fontFamily: "JetBrains Mono",
            minimap: {
              enabled: false,
            },
          }}
          value={
            activeFileTab?.value
              ? activeFileTab.value
              : "//welcome to the playground"
          }
          onMount={handleEditortheme}
        />
      )}
    </>
  );
};
