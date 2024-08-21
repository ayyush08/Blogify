import { Router } from "express";
import { uploadBlog,updateBlogContent } from "../controllers/blogs.controller";


const router = Router();

router.route('/upload/:userId').post(uploadBlog);
router.route('/update/:blogId').put(updateBlogContent);



export default router