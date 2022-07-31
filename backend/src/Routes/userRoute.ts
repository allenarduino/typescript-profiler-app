import { Router } from 'express';
import {
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from '../Controllers/userController';
import { auth } from '../Middlewares/auth';

const router = Router();

router.post('/', registerUser);
router.post('/', loginUser);
router.get('/', auth, getUsers);
router.put('/', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;
