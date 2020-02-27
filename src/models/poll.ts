import {model, Schema, Document } from 'mongoose'

export interface IPoll extends Document {
    question: string;
    yes: Number;
    no: Number;
}


const pollSchema = new Schema({
    question: {
        type: String, 
        required: true,
    },
    yes: {
        type: Number,
        required: true
    },
    no: {
        type: Number,
        required: true
    }
});

export default model<IPoll>('Event', pollSchema);