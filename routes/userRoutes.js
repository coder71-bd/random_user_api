import express from "express";
import { getAllUser, getRandomUser } from "../controller/userController.js";
const router = express.Router();

router.get("/random", getRandomUser);
router.get("/all", getAllUser);

export default router;
