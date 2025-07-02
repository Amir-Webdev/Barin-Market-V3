import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  uploadProductImages,
  getTopProducts,
  getProductFilters,
  addProductImages,
  deleteProductImages,
  likeProduct,
  removeProductLike,
} from "../controllers/product.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { authenticate, checkIsAdmin } from "../utils/authenticate.js";
import checkObjectId from "../utils/checkObjectId.js";
import { uploadImage } from "../utils/uploadImage.js";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.post("/", authenticate, checkIsAdmin, asyncHandler(createProduct));
router.get("/top", getTopProducts);
router.get("/filters", getProductFilters);
router.get("/:id", checkObjectId, asyncHandler(getProductById));
router.put(
  "/:id",
  authenticate,
  checkIsAdmin,
  checkObjectId,
  asyncHandler(updateProduct)
);
router.delete(
  "/:id",
  authenticate,
  checkIsAdmin,
  checkObjectId,
  asyncHandler(deleteProduct)
);
router.post(
  "/:id/images",
  authenticate,
  checkIsAdmin,
  uploadImage.single("image"),
  asyncHandler(uploadProductImages)
);
router.delete(
  "/:id/images",
  authenticate,
  checkIsAdmin,
  asyncHandler(deleteProductImages)
);
router.put(
  "/:id/images",
  authenticate,
  checkIsAdmin,
  asyncHandler(addProductImages)
);
router.post(
  "/:productId/:userId/like",
  authenticate,
  asyncHandler(likeProduct)
);
router.delete(
  "/:productId/:userId/like",
  authenticate,
  asyncHandler(removeProductLike)
);

export default router;
