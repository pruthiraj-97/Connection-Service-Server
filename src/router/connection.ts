import express from 'express'
import {follow} from '../controller/connection'
const router=express.Router()
router.post('/follow',follow)
export default router