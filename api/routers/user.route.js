import express from 'express'
import { test, updateUser ,getUserListings} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getUser } from 'moongose/controller/user_controller.js';



const router=express.Router();


router.get('/test',test)
router.post('/update/:id', updateUser)
router.get('/listings/:id', getUserListings)
router.get('/:id',getUser)
export default router;