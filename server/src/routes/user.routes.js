import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateAccountDetails,
    updateUserCoverImage,
    help
} from "../controllers/user.controller.js";
import { getAllAdvs, getAdvById, newAdv, updateAdv, deleteAdv } from "../controllers/adv.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
// secured advertisement routes
router.route("/newAd").post(verifyJWT, upload("thumbnails"),upload.single("adVid"), newAdv)
router.route("/getAllAdvs").get(verifyJWT,  getAllAdvs)
router.route("/getAdvById").get(verifyJWT,  getAdvById)
router.route("/updateAdv").patch(verifyJWT,  updateAdv)
router.route("/deleteAdv").delete(verifyJWT, deleteAdv)
//public route
router.get('/help', help);

export default router