import {model, Schema, Document } from 'mongoose'

export interface IPoll extends Document {
    question: string;
    yes: number;
    no: number;
    date: Date;
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
    },
    date: {
        type: Date,
        required: true
    }
});

export default model<IPoll>('Poll', pollSchema);