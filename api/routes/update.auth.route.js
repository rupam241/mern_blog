import express from 'express'
import {deleteAccount, updatePassword} from '../controllers/updateAuth.controller.js'
const router=express.Router();

router.post('/update',updatePassword)
router.delete('/delete',deleteAccount)

export default router;