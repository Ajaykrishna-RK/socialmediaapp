import express from "express"
import {Comments, DeleteComments, deletePost, getFeedPosts , getUserPosts,likePost} from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js"


const router = express.Router()

// Read

router.get("/",verifyToken,getFeedPosts)

router.get("/:userId/posts",verifyToken,getUserPosts)

router.delete("/:userId",verifyToken,deletePost)

// update like posts

router.patch("/:id/like",verifyToken,likePost)

router.post('/:postId/comments/',verifyToken,Comments)

router.delete('/:postId/comments/:commentId',verifyToken,DeleteComments)


export default router