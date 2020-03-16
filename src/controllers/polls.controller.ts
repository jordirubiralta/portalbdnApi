import {Request, Response} from 'express'
import Poll, {IPoll} from '../models/poll'
import PollUser, {IPollUser} from '../models/poll_user'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export const addPoll = async (req: Request, res: Response) => {
    if (!req.body.question) {
        return res.status(400).json({msg: 'S\'ha d\'inserir només una pregunta'});
    }
    console.log(req)
    const poll = new Poll(
        {
            question: req.body.question,
            yes: 0,
            no: 0,
            date: Date.now()
        });
    await poll.save()
    return res.status(201).json(poll)
}

export const getPolls = async (req: Request, res: Response) => {
    /*const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.JWTSECRET, (err, decoded) => {      
          if (err) {
            return res.json({ mensaje: 'Token inválida' });    
          } else {
            /*req.decoded = decoded;    
            next();
          }
        });
      } else {
        res.send({ 
            mensaje: 'Token no proveída.' 
        });
    }*/
    if (!req.body.user_id) {
        return res.status(401).json({msg: 'Falta l\'id de l\'usuari'});
    }
    const polls = await Poll.find()
    var result = Array();
    for (var poll of polls) {
        var pollUser = await PollUser.findOne()
            .where('user_id').equals(req.body.user_id)
            .where('poll_id').equals(poll.id);
        result.push({poll_id: poll.id, question: poll.question, answer: pollUser?.answer})
    }
    return res.status(200).json(result)
}

export const answerPoll = async (req: Request, res: Response) => {
    console.log(req.body)
    if (!req.body.user_id || !req.body.poll_id) {
        return res.status(401).json({msg: 'Falten dades'});
    }
    const newPollUser = new PollUser(
        {
            user_id: req.body.user_id,
            poll_id: req.body.poll_id,
            answer: req.body.answer,
        });

    const pollUser = await PollUser.findOne({user_id: newPollUser.user_id, poll_id: newPollUser.poll_id})
    const poll = await Poll.findOne({_id: req.body.poll_id});

    if (pollUser) {
        if (poll != null) {
            if (pollUser.answer) {
                await poll.updateOne({yes: --poll.yes})
            } else {
                await poll.updateOne({no: --poll.no})
            }
            if (newPollUser.answer) {
                await poll.updateOne({yes: ++poll.yes})
            } else {
                await poll.updateOne({no: ++poll.no})
            }
            await pollUser.updateOne({answer: newPollUser.answer})
        }
    } else {
        if (poll != null) {
            if (newPollUser.answer) {
                await poll.updateOne({yes: ++poll.yes})
            } else {
                await poll.updateOne({no: ++poll.no})
            }
            await newPollUser.save()
        }
    }
    return res.status(200).json(poll)
}