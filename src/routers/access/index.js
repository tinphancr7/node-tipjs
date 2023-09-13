import express from "express";

import asyncHandler from "../../helpers/asyncHandler";
import {authentication} from "../../auth/authUtils";
import accessController from "../../controllers/access.controller";

const router = express.Router();

router.post("/signup", asyncHandler(accessController.signUp));
router.post("/login", asyncHandler(accessController.login));
//authentication
router.use(asyncHandler(authentication));
router.get("/refresh", asyncHandler(accessController.handleRefreshToken));
router.post("/logout", asyncHandler(accessController.logout));
export default router;
