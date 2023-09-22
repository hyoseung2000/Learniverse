import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

import {
  ChattingInfo,
  ConsumerId,
  PeersInfo,
  RoomPeerInfo,
} from '@/types/socket';

import { getNickName } from '../../utils/getNicknames';

export const handleConnectError = (error: any) => {
  console.error('socket connection error:', error.message);
};

export const handleNewProducers = async (
  data: PeersInfo[],
  consumeProducers: (producers: PeersInfo[]) => Promise<void>,
  setCurMembers: React.Dispatch<React.SetStateAction<RoomPeerInfo[]>>,
) => {
  console.log('4. New producers (consumeList)', data);
  const newMemberNickName = await getNickName(data[0].producer_user_name);
  const newMember = {
    id: data[0].producer_user_id,
    name: data[0].producer_user_name,
    nickname: newMemberNickName,
  };
  setCurMembers((prev) => [...prev, newMember]);
  await consumeProducers(data);
};

export const handleMessage = async (
  data: ChattingInfo,
  setChattingList: Dispatch<SetStateAction<ChattingInfo[]>>,
) => {
  const nickname = await getNickName(data.name.toString());
  const dataWithNickname = {
    name: nickname,
    message: data.message,
    time: data.time,
  };
  setChattingList((prev: ChattingInfo[]) => [...prev, dataWithNickname]);
};

export const handleConsumerClosed = (
  data: ConsumerId,
  removeStream: (producer_id: string) => void,
) => {
  removeStream(data.consumer_id);
};

export const handleDisconnect = (router: NextRouter) => {
  router.push('/home');
};
