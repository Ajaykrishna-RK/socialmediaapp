import express from "express"
import { getAllUserDetails ,getAllUserPosts, getUserLength} from "../controllers/admin.js"
import { AdminVerify } from "../middleware/admin.js"


const router = express.Router()

router.get("/users",AdminVerify,getAllUserDetails)
router.get("/users/posts",AdminVerify,getAllUserPosts)
router.get("/users/length",AdminVerify,getUserLength)

export default router


