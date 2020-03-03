import {Request, Response} from 'express'
import User, {IUser} from '../models/user'
import jwt, { sign } from 'jsonwebtoken'
import config from '../config/config'
function createToken(user: IUser) {
    return jwt.sign({id: user.id, email: user.email}, config.JWTSECRET, {
        expiresIn: 86400
    });
}

export const signUp = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password || !req.body.age 
        || !req.body.name || !req.body.surname ) {
        return res.status(400).json({msg: 'Completa tots els camps obligatoris'})
    } 
    const user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json({msg: 'L\'usuari ja existeix'});
    }
    const newUser = new User(req.body)
    await newUser.save();

    const isMatch = await newUser.comparePassword(req.body.password)
    if (isMatch) {
        console.log(newUser.surname)
        return res.status(200).json({email: newUser.email, name: newUser.name,
            surname: newUser.surname, age: newUser.age, id: newUser.id, token: 'Bearer ' + createToken(newUser)});
    }
    return res.status(201).json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(404).json({msg: 'Es necessita email i contrasenya'})
    }
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(500).json({msg: 'Aquest usuari no està registrat'});
    }

    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        console.log(user.surname)
        return res.status(200).json({email: user.email, name: user.name,
            surname: user.surname, age: user.age, id: user.id, token: 'Bearer ' + createToken(user)});
    }
    return res.status(500).json({msg: 'Contrasenya incorrecte'});
}