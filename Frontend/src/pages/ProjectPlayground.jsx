import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructures/TreeStructure";
import { useEffect } from "react";
import { useTreeStructureStore } from "../stores/treeStructureStore";
import { useEditorSocketStore } from "../stores/editorSocketStore";
import { io } from "socket.io-client";
export const ProjectPlayground = () => {
  const { projectId: projectIdFromURL } = useParams();

  const { setProjectId, projectId } = useTreeStructureStore();

  const { setEditorSocket } = useEditorSocketStore();

  useEffect(() => {
    if (projectIdFromURL) {
      console.log(import.meta.env.VITE_BACKEND_URL);
      setProjectId(projectIdFromURL);
      const editorSocketConnection = io(`http://localhost:3000/editor`, {
        query: {
          projectId: projectIdFromURL,
        },
      });
      setEditorSocket(editorSocketConnection);
    }
  }, [setProjectId, projectIdFromURL]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#333254",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99vh",
              overflow: "auto",
            }}
          >
            <TreeStructure />
          </div>
        )}
        <EditorComponent />
      </div>
      <EditorButton isActive={false} />
      <EditorButton isActive={true} />
    </>
  );
};
