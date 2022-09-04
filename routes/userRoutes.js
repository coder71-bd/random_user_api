import express from "express";
import {
  bulkUpdateUser,
  deleteUser,
  getAllUser,
  getRandomUser,
  saveUser,
  updateUser,
} from "../controller/userController.js";
import {
  validateBulkUserUpdate,
  validateRequest,
  validateUser,
  validateUserUpdate,
} from "../middlewares/validator.js";
const router = express.Router();

router.get("/random", getRandomUser);
router.get("/all", getAllUser);
router.post("/save", validateUser, validateRequest, saveUser);
router.patch("/update", validateUserUpdate, validateRequest, updateUser);
router.patch(
  "/bulk-update",
  validateBulkUserUpdate,
  validateRequest,
  bulkUpdateUser
);
router.delete("/delete", deleteUser);

export default router;
