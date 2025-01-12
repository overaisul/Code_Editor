import { Button, Layout } from "antd";
import { useCreateProject } from "../hooks/apis/mutation/useCreateProjects.js";
import { useNavigate } from "react-router-dom";

export const CreateProject = () => {
  const navigate = useNavigate();
  const { Header, Content, Footer } = Layout;
  const { createProjectMutation, isPending } = useCreateProject();
  async function handleCreateProject() {
    console.log("going to create project");
    try {
      const reponse = await createProjectMutation();
      navigate(`/project/${reponse.data}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Layout>
        <Header>
          <div className="logo" />
        </Header>
        <Content>
          <div className="site-layout-content">
            <Button
              type="primary"
              loading={isPending}
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </div>
        </Content>
      </Layout>
    </>
  );
};
