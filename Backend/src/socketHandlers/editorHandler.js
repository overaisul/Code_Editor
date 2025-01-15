import fs from "fs/promises";
import path from "path";
export const handleEditorSocketEvents = (socket) => {
  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.emit("writeFileResponse", {
        data: "file written successfully",
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        data: "error writing file",
      });
    }
  });
  socket.on("createFile", async ({ pathToFileOrFolder }) => {
    const isFileAlreadyExists = await fs.stat(pathToFileOrFolder);
    if (isFileAlreadyExists) {
      socket.emit("error", {
        data: "file already exists",
      });
      return;
    }

    try {
      const response = await fs.writeFile(pathToFileOrFolder, "");
      socket.emit("createFileResponse", {
        data: "file created successfully",
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        data: "error creating file",
      });
    }
  });

  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder);
      console.log(response.toString());
      socket.emit("readFileResponse", {
        value: response.toString(),
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        data: "error reading file",
      });
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.unlink(pathToFileOrFolder);
      socket.emit("deleteFileResponse", {
        data: "file deleted successfully",
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        data: "error deleting file",
      });
    }
  });

  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.mkdir(pathToFileOrFolder);
      socket.emit("createFolderResponse", {
        data: "folder created successfully",
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        data: "error creating folder",
      });
    }
  });

  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rmdir(pathToFileOrFolder, { recursive: true });
      socket.emit("deleteFolderResponse", {
        data: "folder deleted successfully",
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        data: "error deleting folder",
      });
    }
  });
};
