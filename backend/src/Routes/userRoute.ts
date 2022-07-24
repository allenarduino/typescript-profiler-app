import { Router } from 'express';
import { getUsers, loginUser, registerUser } from '../Controllers/UserController';

const router = Router();

router.post('/', registerUser);
router.post('/', loginUser);
router.get('/', getUsers);

export default router;
