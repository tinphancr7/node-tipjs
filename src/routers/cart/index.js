import express from "express";

import asyncHandler from "../../helpers/asyncHandler";
import {authentication} from "../../auth/authUtils";

const router = express.Router();

//authentication
// router.use(asyncHandler(authentication));
// router.get("/refresh", asyncHandler(accessController.handleRefreshToken));
// router.post("/logout", asyncHandler(accessController.logout));
export default router;
