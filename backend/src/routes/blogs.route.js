import { Router } from "express";
import { uploadBlog,updateBlogContent,deleteBlog,getUserBlogs } from "../controllers/blogs.controller";


const router = Router();

router.route('/upload/:userId').post(
    upload.fields([
        {
            name:'thumbnail',
            maxCount: 1
        }
    ]),
    uploadBlog)
router.route('/:blogId').put(updateBlogContent).delete(deleteBlog);
router.route('/user/:userId').get(getUserBlogs)


export default router