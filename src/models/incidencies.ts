import {model, Schema, Document } from 'mongoose'
import User, {IUser} from './user'

export interface IIncidencia extends Document {
    user_id: string;
    title: string;
    description: Number;
    date: string;
    location: string;
}

const incidentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    resolved: {
        type: Boolean,
        required: true
    }
});

export default model<IIncidencia>('Incident', incidentSchema);