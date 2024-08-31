import express from 'express'
import {follow,ConnectionChain,getAllUsers} from '../controller/connection'
import {isAuthenticate} from '../middleware/isAuthenticate'
const router=express.Router()
router.post('/follow/:userId',isAuthenticate,follow)
router.get('/connect',isAuthenticate,ConnectionChain)
router.get('/users',isAuthenticate,getAllUsers)
export default router