import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import agentRouter from "./routes/agent";
import requestRouter from "./routes/request";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(agentRouter);
app.use(requestRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
