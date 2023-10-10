/* eslint-disable @typescript-eslint/no-explicit-any */
import { RtpParameters } from 'mediasoup-client/lib/RtpParameters';
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
  coreTimeId: string;
  peers: PeersInfo[];
  peerCount: number;
}

export interface PeersInfo {
  producer_id: string; // producer id
  producer_type: string; // video or audio
  producer_user_id: string; // socket id
  producer_user_name: string; // memeber id
}

export interface RoomPeerInfo {
  id: string; // socket id
  memberId: number; // memeber id
  nickname?: string; // memeber nickname
}

export interface ChattingInfo {
  memberId: number; // member id
  message: string; // chatting message
  time: string; // chatting time
}

export interface ConsumerId {
  consumer_id: string; // consumer id
}

export interface ConsumeInfo {
  nickname: string; // memeber nickname
  memberId: number; // memeber id
  consumer_id: string; // consumer_id
  stream: MediaStream; // stream (video or audio)
}

export interface ConsumerInfo {
  producerId: string; // producer id
  producerName: number; // memeber id
  id: string; // consumer id
  kind: 'video' | 'audio';
  rtpParameters: RtpParameters;
  type: string;
  producerPaused: boolean;
}
