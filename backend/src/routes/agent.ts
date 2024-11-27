import express from "express";
import agentController from "../controllers/agent";

const router = express.Router();

router.post("/agent", agentController.generateResponse);

export default router;
