import express from "express";
import { getAllRequests, getSingleRequest } from "../controllers/request";

const router = express.Router();

router.get("/request/address/:address", getAllRequests);

router.get("/request/id/:requestId", getSingleRequest);

export default router;
