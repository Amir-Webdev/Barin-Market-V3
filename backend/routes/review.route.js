import express from "express";
import { authenticate } from "../utils/authenticate.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createProductReview,
  deleteReview,
  getUserReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", authenticate, asyncHandler(getUserReviews));
router.post("/:productId", authenticate, asyncHandler(createProductReview));
router.delete("/:userId", authenticate, asyncHandler(deleteReview));

export default router;
