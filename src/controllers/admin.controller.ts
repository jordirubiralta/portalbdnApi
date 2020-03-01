import {Request, Response} from 'express'
import Administrator, {IAdministrator} from '../models/admin'
import jwt from 'jsonwebtoken'
import config from '../config/config'
function createToken(admin: IAdministrator) {
    return jwt.sign({id: admin.id, username: admin.username}, config.JWTSECRET, {
        expiresIn: 86400
    });
}

export const signUpAdmin = async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Completa tots els camps obligatoris'})
    } 
    const admin = await Administrator.findOne({username: req.body.username});
    console.log(admin);
    if (admin) {
        return res.status(400).json({msg: 'L\'usuari ja existeix'});
    }
    const newAdmin = new Administrator({username: req.body.username, password: req.body.password, admin_level: 1})
    await newAdmin.save();

    return res.status(201).json(newAdmin);
}

export const signInAdmin = async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Es necessita username i contrasenya'})
    }
    const admin = await Administrator.findOne({username: req.body.username});
    if (!admin || admin.admin_level != 1) {
        return res.send(400).json({msg: 'Aquest administrador no està registrat'});
    }

    const isMatch = await admin.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({admin_level: admin.admin_level, token: 'Bearer ' + createToken(admin)});
    }
    return res.send(400).json({msg: 'Contrasenya incorrecte'});
}

export const signUpEntity = async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Completa tots els camps obligatoris'})
    } 
    const admin = await Administrator.findOne({username: req.body.username});
    console.log(admin);
    if (admin) {
        return res.status(400).json({msg: 'L\'usuari ja existeix'});
    }
    const newAdmin = new Administrator({username: req.body.username, password: req.body.password, admin_level: 0})
    await newAdmin.save();

    return res.status(201).json(newAdmin);
}

export const signInEntity = async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({msg: 'Es necessita username i contrasenya'})
    }
    const admin = await Administrator.findOne({username: req.body.username});
    if (!admin || admin.admin_level != 1) {
        return res.send(400).json({msg: 'Aquest administrador no està registrat'});
    }

    const isMatch = await admin.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({admin_level: admin.admin_level, token: 'Bearer ' + createToken(admin)});
    }
    return res.send(400).json({msg: 'Contrasenya incorrecte'});
}