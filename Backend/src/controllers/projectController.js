import util from "util";
import ChildProcess from "child_process";
import fs from "fs/promises";
import uuid4 from "uuid4";
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";

const execPromisified = util.promisify(ChildProcess.exec);

export const createProjectController = async (req, res) => {
  //Create a unique id for the project
  const projectId = uuid4();
  console.log("new project id", projectId);
  await fs.mkdir(`./projects/${projectId}`);

  //after this call the npm create vite command on new project folder.

  const reponse = await execPromisified(REACT_PROJECT_COMMAND, {
    cwd: `./projects/${projectId}`,
  });

  return res.status(200).json({ message: "Project Created", data: projectId });
};
