import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomsController } from 'server/controllers/chat_rooms.controller';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { Message } from 'server/entities/message.entity';
import { ChatRoomsService } from 'server/providers/services/chat_rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom, Message])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
  exports: [],
})
export class ChatRoomsModule {}
