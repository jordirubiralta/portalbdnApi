import {Router} from 'express'
import passport from 'passport'
const router = Router();

import {getIncidents, addIncidencia} from '../controllers/incident.controller'
import {signIn, signUp} from '../controllers/user.controller'

router.post('/incidencies', getIncidents, passport.authenticate('jwt', { session: false }))
router.post('/incidencia', addIncidencia, passport.authenticate('jwt', { session: false }))

export default router;