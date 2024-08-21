import { Router } from "express";
import { uploadBlog,updateBlogContent,deleteBlog } from "../controllers/blogs.controller";


const router = Router();

router.route('/upload/:userId').post(uploadBlog);
router.route('/:blogId').put(updateBlogContent).delete(deleteBlog);



export default router