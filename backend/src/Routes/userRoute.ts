import { Router } from 'express';
import { getUsers, loginUser, registerUser } from '../Controllers/userController';
import { auth } from '../Middlewares/auth';

const router = Router();

router.post('/', registerUser);
router.post('/', loginUser);
router.get('/', auth, getUsers);

export default router;
