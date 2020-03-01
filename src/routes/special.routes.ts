import {Router} from 'express'
import passport from 'passport'
const router = Router();

import {getIncidents, addIncidencia} from '../controllers/incident.controller'
import {addEvent, updateEvent, getEvents} from '../controllers/event.controller'

router.post('/incidencies', getIncidents, passport.authenticate('jwt', { session: false }))
router.post('/incidencia', addIncidencia, passport.authenticate('jwt', { session: false }))

router.post('/addEvent', addEvent, passport.authenticate('jwt', { session: false }))
router.post('/updateEvent', updateEvent, passport.authenticate('jwt', { session: false }))
router.get('/getEvents', getEvents, passport.authenticate('jwt', { session: false }))

export default router;