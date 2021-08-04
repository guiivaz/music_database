import * as mongoose from 'mongoose';

export const SongSchema = new mongoose.Schema(
    {
        title: { type: String, required: true},
        artist: { type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
    }
)

export interface Song extends mongoose.Document{
    title: string;
    artist: string;
    user: string;
}
    