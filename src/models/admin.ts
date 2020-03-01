import {model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IAdministrator extends Document {
    username: string;
    password: string;
    admin_level: number;
    comparePassword: (password: string) => Promise<Boolean>
}

const administratorSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    admin_level: {
        type: Number,
        required: true
    }
});

administratorSchema.pre<IAdministrator>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

administratorSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IAdministrator>('Administrator', administratorSchema);