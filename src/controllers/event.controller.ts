import {Request, Response} from 'express'
import Event, {IEvent} from '../models/event'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import dateformat from 'dateformat'

export const addEvent = async (req: Request, res: Response) => {
    if (!req.body.title || !req.body.description || !req.body.date || !req.body.img 
        || !req.body.organizator) {
        return res.status(400).json({msg: 'Falten dades'});
    }
    const event = new Event(
        {
            title: req.body.title,
            description: req.body.description,
            date: dateformat(new Date(), req.body.date),
            img: req.body.img,
            organizator: req.body.organizator
        });
    await event.save()
    console.log(event);
    return res.status(201).json(event)
}

export const updateEvent = async (req: Request, res: Response) => {
    if (!req.body.id) {
        return res.status(400).json({msg: 'Falta l\'id'});
    }
    const event = await Event.findOne({_id: req.body.id});
    if (!event) {
        return res.status(400).json({msg: 'No existeix cap esdeveniment amb aquest id'});
    }
    
    await event.updateOne(req.body)
    console.log(event);
    const updateEvent = await Event.findOne({_id: req.body.id});
    return res.status(201).json(updateEvent)
}

export const getEvents = async (req: Request, res: Response) => {

    const events = await Event.find({}).where('date < Date.now()')
    return res.status(200).json(events)
}