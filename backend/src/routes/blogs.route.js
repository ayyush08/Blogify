import { Router } from "express";
import { uploadBlog } from "../controllers/blogs.controller";


const router = Router();

router.route('/upload/:userId').post(uploadBlog);



export default router