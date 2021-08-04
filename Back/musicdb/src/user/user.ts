import * as mongoose from 'mongoose';
import { Song } from 'src/song/song';


export const UserSchema = new mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        songs: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Song'}
        ]
    }
)

export interface User extends mongoose.Document{
    username: string;
    password: string;
    songs: [Song];
}