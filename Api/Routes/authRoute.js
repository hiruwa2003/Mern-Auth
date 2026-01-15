import express from 'express';
import { signup , signin, google, signout, deleteAccount } from '../Controllers/authControllers.js';
import { verifyToken } from '../Utills/verifyuser.js';



const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/signout', signout);
router.delete('/delete', verifyToken, deleteAccount);

export default router;