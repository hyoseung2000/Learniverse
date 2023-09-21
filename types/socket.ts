/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io-client';

type SocketType = typeof Socket;

export type MediaType = 'audioType' | 'videoType' | 'screenType';

export interface CustomSocket extends SocketType {
  request?: (event: string, data?: any) => Promise<any>;
}

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
  producer_id: string;
  produce_name: string;
  produce_type: string;
}

export interface RoomPeerInfo {
  id: string;
  name: string;
  nickname?: string;
}

export interface ProducerList {
  produce_type: string;
  producer_id: string;
  producer_socket_id?: string;
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
  nickname: string;
  producer_id: string;
  stream: MediaStream;
}
