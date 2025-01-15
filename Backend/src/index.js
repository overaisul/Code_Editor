import express from "express";
import { PORT } from "./config/serverConfig.js";
import { createServer } from "http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import cors from "cors";
import apiRouter from "./routers/index.js";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
  console.log("editor connected");
  let projectId = socket.handshake.query.projectId;
  console.log("projectId", projectId);
  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
      },
      ignoreInitial: true,
    });
    watcher.on("all", (event, path) => {
      console.log(`File ${path} has been ${event}`);
    });
  }
  handleEditorSocketEvents(socket);
  // socket.on("disconnect", async () => {
  //   await watcher.close();
  //   console.log("editor disconnected");
  // });
});

server.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
