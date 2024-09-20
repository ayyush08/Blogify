import { Router } from "express";
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { loginUser,logoutUser,registerUser,refreshAccessToken,getUserProfile } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/profile/:userId').get(getUserProfile)
router.route('/register').post(
    upload.fields([
        {
            name:'avatar',
            maxCount: 1
        }
    ]),
    registerUser)

router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
export default router