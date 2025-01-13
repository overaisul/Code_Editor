import { useParams } from "react-router-dom";
import { EditorComponent } from "../components/molecules/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";

export const ProjectPlayground = () => {
  const { projectId } = useParams();
  return (
    <>
      <h1>{projectId}</h1>
      <EditorComponent />
      <EditorButton isActive={false} />
      <EditorButton isActive={true} />
    </>
  );
};
