import {model, Schema, Document } from 'mongoose'
import User, {IUser} from './user'
import Poll, {IPoll} from './poll'

export interface IPollUser extends Document {
    user_id: string;
    poll_id: string;
    answer: Boolean;
}

const polluserSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    poll_id: {
        type: Schema.Types.ObjectId, ref: 'Poll',
        required: true
    },
    answer: {
        type: Boolean,
        required: true
    }
});

export default model<IPollUser>('PollUser', polluserSchema);