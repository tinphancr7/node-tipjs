import express from "express";
import asyncHandler from "../../helpers/asyncHandler";
import {authentication} from "../../auth/authUtils";
import ProductController from "../../controllers/product.controller";

const router = express.Router();
router.post("/search", asyncHandler(ProductController.searchProducts));
router.get("/", asyncHandler(ProductController.getAllProducts));
router.get("/:product_id", asyncHandler(ProductController.getSingleProduct));

router.use(asyncHandler(authentication));
router.get("/drafts/all", asyncHandler(ProductController.getAllDraftsForShop));
router.get(
	"/published/all",
	asyncHandler(ProductController.getAllPublishForShop)
);
router.patch("/:product_id", asyncHandler(ProductController.updateProduct));
router.post("/", asyncHandler(ProductController.createProduct));
router.post(
	"/publish/:id",
	asyncHandler(ProductController.publishProductByShop)
);
router.post(
	"/unpublish/:id",
	asyncHandler(ProductController.unPublishProductByShop)
);

export default router;
