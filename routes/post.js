import express from 'express';
import { getPostBySearch, getPost, createPost, upDatePost, deletePost, likePost, getPosts, createComment } from '../controllers/posts.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/mutlerMiddleWare.js';

const router = express.Router();

router.get('/', getPosts);
router.post("/", upload.single("image"), createPost);
// router.post("/", upload.single("image"), auth, createPost);
router.get("/search", getPostBySearch);

router.patch("/:id", auth, upDatePost);
router.get("/:id", getPost)
router.delete("/:id", auth, deletePost);
router.patch("/:id/likepost", auth, likePost)
router.post("/:id/comment", auth, createComment)

export default router