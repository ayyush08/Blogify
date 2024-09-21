import { Router } from "express";
import { addComment,deleteComment,getBlogComments } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route('/:blogId').get(getBlogComments)
router.route("/:blogId").post(verifyJWT,addComment)
router.route("/:commentId").delete(verifyJWT,deleteComment);


export default router;