import express from "express";
import { PORT } from "./config/serverConfig.js";

import cors from "cors";
import apiRouter from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
