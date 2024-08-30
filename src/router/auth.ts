import express from 'express'
import {Register} from '../controller/auth'
const router=express.Router()
router.post('/register',Register)
export default router