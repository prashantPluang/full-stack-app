import { register, login } from '../controllers/auth';
import express from 'express';
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);

export { router };