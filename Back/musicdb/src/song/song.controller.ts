import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Song } from './song';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService){}
        
        //CREATE
        @Post()
        async creatSong(@Body() song: Song): Promise<any>{
            var result = await this.songService.createSong(song);
            return {id: result};
        }

        //READ
        @Get()
        readAllSongs(): Promise<any>{
            return this.songService.readSongs();
        }
        
        @Get(':id')
        readSongById(@Param('id') id: string){
            return this.songService.readSongById(id);
        }
        @Get('title/:title')
        readSongByTitle(@Param('title') title: string){
            return this.songService.readSongByTitle(title);
        }
        @Get('user/:id')
        readTasksByUser(@Param('id') id: string){
        return this.songService.readSongsByUser(id);
        }
        //UPDATE
        @Patch()
        async updateSong( @Body() song: Song) : Promise<any>{
           return await this.songService.updateSong(song);
       }
       //DELETE
        @Delete(':id')
        async deleteSongById(@Param('id') id: string){
           await this.songService.deleteSong(id);
       }
        
    
}
