/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChattingInfo,
  ConsumerId,
  PeersInfo,
  RoomPeerInfo,
} from '@/types/socket';

import { getNickName } from './getNicknames';

export const handleConnectError = (error: any) => {
  console.error('socket connection error:', error.message);
};

export const handleNewProducers = async (
  data: PeersInfo[],
  consumeProducers: (producers: PeersInfo[]) => Promise<void>,
  setCurMembers: React.Dispatch<React.SetStateAction<RoomPeerInfo[]>>,
) => {
  console.log('4. New producers (consumeList)', data);
  const newMemberNickName = await getNickName(data[0].produce_name);
  const newMember = {
    id: data[0].producer_id,
    name: data[0].produce_name,
    nickname: newMemberNickName,
  };
  setCurMembers((prev) => [...prev, newMember]);
  await consumeProducers(data);
};

export const handleMessage = (data: ChattingInfo, setChattingList: any) => {
  setChattingList((prev: ChattingInfo[]) => [...prev, data]);
};

export const handleConsumerClosed = (data: ConsumerId, removeStream: any) => {
  removeStream(data.consumer_id);
};

export const handleDisconnect = (router: any) => {
  router.push('/home');
};
