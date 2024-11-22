import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
import { google } from '../controllers/auth.controller.js';
import { logout } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google',google);
router.post('/logout',logout)





export default router;