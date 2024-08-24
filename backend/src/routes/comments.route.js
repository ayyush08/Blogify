import { Router } from "express";
import { addComment,deleteComment,getBlogComments } from "../controllers/comment.controller";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/:blogId").post(addComment).get(getBlogComments);
router.route("/:commentId").delete(deleteComment);