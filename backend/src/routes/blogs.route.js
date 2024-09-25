import { Router } from "express";
import { uploadBlog,updateBlogContent,deleteBlog,getUserBlogs,getAllBlogs, getBlogById } from "../controllers/blogs.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route('/fetchBlogs').get(getAllBlogs)
router.route('/:blogId').get(getBlogById)
router.route('/user/:userId').get(getUserBlogs)
router.use(verifyJWT)
router.route('/upload').post(
    upload.fields([
        {
            name:'thumbnail',
            maxCount: 1
        }
    ]),
    uploadBlog)
router.route('/:blogId').put(updateBlogContent).delete(deleteBlog);


export default router