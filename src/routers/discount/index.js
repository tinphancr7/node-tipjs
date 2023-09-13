import express from "express";

import asyncHandler from "../../helpers/asyncHandler";
import {authentication} from "../../auth/authUtils";
import discountController from "../../controllers/discount.controller";

const router = express.Router();

router.get("/amount", asyncHandler(discountController.getDiscountAmount));
router.get(
	"/list_product_code",
	asyncHandler(discountController.getAllDiscountWithProducts)
);
router.post("/", asyncHandler(discountController.createDiscountCode));
router.get("/", asyncHandler(discountController.getAllDiscountCodes));

export default router;
