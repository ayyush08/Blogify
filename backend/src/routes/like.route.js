import { Router } from "express";
import { getBlogLikes, toggleBlogLike, toggleCommentLike,getCommentLikes } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();


router.use(verifyJWT);



router.route("/bloglikes/:blogId").post(toggleBlogLike).get(getBlogLikes);
router.route("/commentlikes/:commentId").post(toggleCommentLike).get(getCommentLikes);

export default router;