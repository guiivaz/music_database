import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import { SongModule } from './song/song.module';
import { SongSchema } from './song/song';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/user';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://gui:1234@cluster0.jtfiv.mongodb.net/MusicDB?retryWrites=true&w=majority'), 
  SongModule,
  MongooseModule.forFeature([{name:'Song', schema:SongSchema}]),
  UserModule,
  MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
