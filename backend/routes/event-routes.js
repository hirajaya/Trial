import express from "express";
import { addEvent, getAllEvents, getEventById } from "../controllers/event-controller.js";
const eventRouter = express.Router();

eventRouter.get("/:id", getEventById);
eventRouter.get("/", getAllEvents);
eventRouter.post("/", addEvent);

export default eventRouter;