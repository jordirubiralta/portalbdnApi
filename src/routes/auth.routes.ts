import { Router } from 'express'
const router = Router();

import {signIn, signUp} from '../controllers/user.controller'
import {signInAdmin, signUpAdmin, signInEntity, signUpEntity} from '../controllers/admin.controller'

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signupAdmin', signUpAdmin)
router.post('/signinAdmin', signInAdmin)
router.post('/signupEntity', signUpEntity)
router.post('/signinEntity', signInEntity)

export default router;