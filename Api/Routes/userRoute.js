import express from 'express';
import { test, updateUser } from '../Controllers/userControllers.js';
import { verifyToken } from '../Utills/verifyuser.js';


const router = express.Router();
// Example user route
router.get('/',test)
router.post('/update/:id',verifyToken,updateUser);

export default router;