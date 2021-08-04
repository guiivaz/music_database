import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './song';

@Injectable()
export class SongService {
    constructor(@InjectModel('Song') private readonly songModel: Model<Song>){}

    //CREATE
    async createSong(song: Song){
        const songModel = new this.songModel(
            {
                title: song.title,
                artist: song.artist,
                user: song.user
            }
        );
        const result = await songModel.save();
        return result.id;
    }

    //READ
    async readSongs(){
        const songs = await this.songModel.find().exec();
        return songs.map(song =>({
            id: song._id,
            title: song.title,
            artist: song.artist,
            user: song.user
        }));
    }
    async readSongsByUser(userID: string){
        const songs = await this.songModel.find({user: userID}).exec();
        return songs.map(song =>({
            id: song._id,
            title: song.title,
            artist: song.artist,
            user: song.user
        }));
    }
    async readSongById(id: string): Promise<any>{
        const song = await this.songModel.findOne({_id: id});
        if(!song){
            throw new NotFoundException('Song not found. Check id');
        }
        return {
            id: song._id,
            title: song.title,
            artist: song.artist,
            user: song.user
        }
    }
    async readSongByTitle(title: string): Promise<any>{
        const song = await this.songModel.findOne({title: title});
        if(!song){
            throw new NotFoundException('Song not found. Check Title');
        }
        return {
            id: song._id,
            title: song.title,
            artist: song.artist,
            user: song.user
        }
    }
    
   //UPDATE
   async updateSong(song:Song){
    const song_old = await this.songModel.findOne({_id: song._id});
    console.log(song);
    if(!song_old){
        throw new NotFoundException('Task not found. Check the id');
    }
    if(song.title != null){
        song_old.title = song.title;
    }
    if(song.artist != null){
        song_old.artist = song.artist;
    }
    song_old.save();
    return{
        id: song_old._id,
        title: song_old.title,
        artist: song_old.artist,
        user: song_old.user
    }
}
   //DELETE
    async deleteSong(id: string){
        const result = await this.songModel.deleteOne({_id: id}).exec();
        if (!result){
            throw new NotFoundException('Could not delete song! Check id!')
    }
}
}
