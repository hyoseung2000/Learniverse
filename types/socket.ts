/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io-client';

type SocketType = typeof Socket;

export type MediaType = 'audioType' | 'videoType' | 'screenType';

export interface ProducerList {
  produce_type: string;
  producer_id: string;
  producer_socket_id: string;
}

export interface CustomSocket extends SocketType {
  request?: (event: string, data?: any) => Promise<any>;
}

export interface ChattingInfo {
  name: string;
  message: string;
  time: string;
}
