import { Router } from "express";
import { toggleBlogLike, toggleCommentLike } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();


router.use(verifyJWT);



router.route("/likes/:blogId").post(toggleBlogLike);
router.route("/likes/:commentId").post(toggleCommentLike);