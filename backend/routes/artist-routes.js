import express from "express";
import { addArtist, artistLogin, getArtists } from "../controllers/artist-controller.js";

const artistRouter =express.Router();

artistRouter.post("/signup", addArtist);
artistRouter.post("/login", artistLogin);
artistRouter.get("/", getArtists);

export default artistRouter;