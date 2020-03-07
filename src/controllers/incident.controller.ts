import {Request, Response} from 'express'
import Incident, {IIncidencia} from '../models/incidencies'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export const addIncidencia = async (req: Request, res: Response) => {
    if (!req.body.user_id || !req.body.title || !req.body.description || !req.body.location) {
        return res.status(400).json({msg: 'Falten dades'});
    }
    const incident = new Incident(
        {
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
            date: Date.now(),
            location: req.body.location,
            resolved: false 
        });
    await incident.save()
    console.log(incident);
    return res.status(201).json(incident)
}

export const getIncidents = async (req: Request, res: Response) => {
    if (!req.body.user_id) {
        return res.status(400).json({msg: 'Falta l\'id de l\'usuari'});
    }
    const incidents = await Incident.find().where('user_id').equals(req.body.user_id).sort({"date": -1});
    return res.status(200).json(incidents)
}