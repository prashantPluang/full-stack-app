import express from 'express';
const router = express.Router();
import {requireLogin} from '../middleware/requireLogin';
import { userProfile } from '../controllers/user';

router.use(requireLogin);
router.get('/user/:id', userProfile);

export { router };