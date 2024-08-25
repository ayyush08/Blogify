import { Router } from "express";
import { uploadBlog,updateBlogContent,deleteBlog,getUserBlogs,getAllBlogs } from "../controllers/blogs.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT)
router.route('/upload/:userId').post(
    upload.fields([
        {
            name:'thumbnail',
            maxCount: 1
        }
    ]),
    uploadBlog)
router.route('/fetchBlogs').get(getAllBlogs)
router.route('/:blogId').put(updateBlogContent).delete(deleteBlog);
router.route('/user/:userId').get(getUserBlogs)


export default router