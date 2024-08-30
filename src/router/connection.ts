import express from 'express'
import {follow,getConnectionChain} from '../controller/connection'
const router=express.Router()
router.post('/follow',follow)
router.get('/connect',getConnectionChain)
export default router