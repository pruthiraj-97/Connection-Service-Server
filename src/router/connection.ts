import express from 'express'
import {follow,getConnectionChain,getAllUsers} from '../controller/connection'
import {isAuthenticate} from '../middleware/isAuthenticate'
const router=express.Router()
router.post('/follow/:userId',isAuthenticate,follow)
router.get('/connect',isAuthenticate,getConnectionChain)
router.get('/users',isAuthenticate,getAllUsers)
export default router