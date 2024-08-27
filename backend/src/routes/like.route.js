import { Router } from "express";
import { getBlogLikes, toggleBlogLike, toggleCommentLike } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();


router.use(verifyJWT);



router.route("/:blogId").post(toggleBlogLike).get(getBlogLikes);
router.route("/:commentId").post(toggleCommentLike);

export default router;