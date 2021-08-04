import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongSchema } from './song';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([{name:'Song', schema:SongSchema}])],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
