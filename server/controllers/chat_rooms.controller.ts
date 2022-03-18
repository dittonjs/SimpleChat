import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { ChatRoomsService } from 'server/providers/services/chat_rooms.service';
import * as crypto from 'crypto';

class ChatRoomBody {
  name: string;
}

@Controller()
export class ChatRoomsController {
  constructor(private chatRoomsService: ChatRoomsService) {}

  @Get('/chat_rooms')
  async index() {
    const chatRooms = await this.chatRoomsService.findAll();
    return { chatRooms };
  }

  @Get('/chat_rooms/:id')
  async show(id: number) {
    const chatRoom = await this.chatRoomsService.findOne(id);
    return { chatRoom };
  }

  @Post('/chat_rooms')
  async create(@Body() body: ChatRoomBody) {
    let chatRoom = new ChatRoom();
    chatRoom.name = body.name;
    chatRoom.roomkey = crypto.randomBytes(8).toString('hex');
    chatRoom = await this.chatRoomsService.create(chatRoom);
    return { chatRoom };
  }
}
