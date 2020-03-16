import {Router} from 'express'
import passport from 'passport'
const router = Router();

import {getIncidents, addIncidencia} from '../controllers/incident.controller'
import {addEvent, updateEvent, getEvents} from '../controllers/event.controller'
import {getPolls, addPoll, answerPoll} from '../controllers/polls.controller'

router.post('/getIncidencies', getIncidents, passport.authenticate('jwt', { session: false }))
router.post('/addIncidencia', addIncidencia, passport.authenticate('jwt', { session: false }))

router.post('/addEvent', addEvent, passport.authenticate('jwt', { session: false }))
router.post('/updateEvent', updateEvent, passport.authenticate('jwt', { session: false }))
router.get('/getEvents', getEvents, passport.authenticate('jwt', { session: true }))

router.post('/getPolls', getPolls, passport.authenticate('jwt', { session: false }))
router.post('/addPoll', addPoll, passport.authenticate('jwt', { session: false }))
router.post('/answerPoll', answerPoll, passport.authenticate('jwt', { session: false }))

export default router;