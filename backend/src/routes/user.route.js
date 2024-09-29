import { Router } from "express";
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { loginUser,logoutUser,registerUser,refreshAccessToken,getUserProfile,validateUserSession,updateUserProfile } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
router.route('/validate-session').get(verifyJWT,validateUserSession);
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
router.route('/update-profile').put(verifyJWT,updateUserProfile)
export default router