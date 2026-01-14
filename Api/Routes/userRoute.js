import express from 'express';
import { test } from '../Controllers/userControllers.js';


const router = express.Router();
// Example user route
router.get('/',test)

export default router;