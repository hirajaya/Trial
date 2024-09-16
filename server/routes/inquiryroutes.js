import express from "express";
import { create, deleteInquiry, getAll, getOne, update } from "../controller/inquirycontroller.js";

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteInquiry);

export default route;
