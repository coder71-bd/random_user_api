import express from "express";
import { getRandomUser } from "../controller/userController.js";
const router = express.Router();

router.get("/random", getRandomUser);

export default router;
