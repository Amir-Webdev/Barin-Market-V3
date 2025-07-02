import express from "express";
import {
  authUser,
  deleteUser,
  forgetPassword,
  getLikedProducts,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  updateUserProfile,
  verifyEmail,
} from "../controllers/user.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { authenticate, checkIsAdmin } from "../utils/authenticate.js";

const router = express.Router();

router.post("/", asyncHandler(registerUser));
router.get("/", authenticate, checkIsAdmin, asyncHandler(getUsers));
router.get("/verify", asyncHandler(verifyEmail));
router.post("/forgetpassword", asyncHandler(forgetPassword));
router.post("/resetpassword", asyncHandler(resetPassword));
router.put("/profile", authenticate, asyncHandler(updateUserProfile));
router.get("/profile", authenticate, asyncHandler(getUserProfile));
router.post("/login", asyncHandler(authUser));
router.post("/logout", asyncHandler(logoutUser));
router.get("/:id", authenticate, checkIsAdmin, asyncHandler(getUserById));
router.put("/:id", authenticate, checkIsAdmin, asyncHandler(updateUser));
router.delete("/:id", authenticate, asyncHandler(deleteUser));
router.get("/:userId/likes", authenticate, asyncHandler(getLikedProducts));

export default router;
