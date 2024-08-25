import { Router } from "express";
import { addComment,deleteComment,getBlogComments } from "../controllers/comment.controller";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/comments/:blogId").post(addComment).get(getBlogComments);
router.route("/comments/:commentId").delete(deleteComment);