import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { MessagesService } from '../services/messages.service';
import { Server, Socket } from 'socket.io';
import { Message } from 'server/entities/message.entity';
import { ConsoleLogger, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import { JwtService } from '../services/jwt.service';

class ChatMessagePayload {
  contents: string;
  userName: string;
  userId: number;
}

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService, private jwtService: JwtService) {}

  handleConnection(client: any, ...args: any[]) {
    try {
      const jwt = client.handshake.auth.token;
      console.log(jwt);
      const body = this.jwtService.parseToken(jwt);
      console.log(body);
      client.join(client.handshake.query.chatRoomId as unknown as string);
    } catch (e) {
      throw new WsException('Invalid token');
    }
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: ChatMessagePayload) {
    let message = new Message();
    message.contents = payload.contents;
    message.userName = payload.userName;
    message.userId = payload.userId;
    message.chatRoomId = parseInt(client.handshake.query.chatRoomId as unknown as string, 10);
    message = await this.messagesService.create(message);
    this.server.to(`${message.chatRoomId}`).emit('message', message);
  }
}
