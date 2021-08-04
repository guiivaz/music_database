import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    // C - CREATE
    async createUser(user: User){
        const userModel = new this.userModel(
            {
                username: user.username,
                password: user.password,
                songs: user.songs
            }

        );
        const result = await userModel.save();
        return result.id;

    }
    // R - READ
    async readUsers(){
        const users = await this.userModel.find().exec();
        return users.map(user =>({
            id: user._id,
            username: user.username,
            password: user.password,
            songs: user.songs
        }));
    }
    async readUserById(id: string): Promise<any>{
        console.log(id);
        const user = await this.userModel.findOne({_id: id});
        if(!user){
            throw new NotFoundException('User not found. Check the id');
        }
        return {
            id: user._id,
            username: user.username,
            password: user.password,
            songs: user.songs
        }
    }
    async login(username:string, password:string): Promise<any>{
        console.log('Login: ' + username);
        const user = await this.userModel.findOne({username: username});
        if (!user){
            return null
            /* throw new NotFoundException('User not found. Check the id'); */  
        }
        if (user.password == password){
            return user._id
        }else{
            return null
        }
    }
}
