import express from 'express';
const router = express.Router();
import {requireLogin} from '../middleware/requireLogin';
import { createPost, getAllPosts, myPost, like, unlike, comment, deletePost } from '../controllers/post';

router.use(requireLogin);

router.get('/allpost', getAllPosts);
router.post('/createpost', createPost)
router.get('/mypost', myPost)
router.put('/like', like)
router.put('/unlike', unlike)
router.put('/comment', comment)
router.delete('/deletepost/:postId', deletePost);

export { router };