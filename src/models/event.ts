import {model, Schema, Document } from 'mongoose'

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    img: string;
    location: string;
    organizator: string;
}


const eventSchema = new Schema({
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
    img: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    organizator: {
        type: String,
        required: true
    }
});

export default model<IEvent>('Event', eventSchema);