/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io-client';

type SocketType = typeof Socket;

export type MediaType = 'audioType' | 'videoType' | 'screenType';

export interface JoinInfo {
  id: string;
  peers: PeersInfo[];
}

export interface RoomInfo {
  room_id: string;
  peers: PeersInfo[];
  peerCount: number;
}

export interface PeersInfo {
  id: number;
  name: string;
  transports: Map<string, any>;
  consumers: Map<string, any>;
  producers: Map<string, any>;
  produceTypes: Map<string, string>;
}

export interface ProducerList {
  produce_type: string;
  producer_id: string;
  producer_socket_id?: string;
}

export interface CustomSocket extends SocketType {
  request?: (event: string, data?: any) => Promise<any>;
}

export interface ChattingInfo {
  name: string;
  message: string;
  time: string;
}

export interface ConsumerId {
  consumer_id: string;
}

export interface ConsumeInfo {
  producer_id: string;
  stream: MediaStream;
}
