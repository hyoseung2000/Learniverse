import { Dispatch, SetStateAction } from 'react';

import {
  ChattingInfo,
  ConsumerId,
  PeersInfo,
  RoomPeerInfo,
} from '@/types/socket';

import { getNickName } from '../../utils/getNicknames';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleConnectError = (error: any) => {
  console.error('socket connection error:', error.message);
};

export const handleNewProducers = async (
  data: PeersInfo[],
  consumeProducers: (producers: PeersInfo[]) => Promise<void>,
  setCurMembers: React.Dispatch<React.SetStateAction<RoomPeerInfo[]>>,
) => {
  console.log('4. New producers (consumeList)', data);

  await consumeProducers(data);

  const newMemberSocketId = data[0].socketId;
  const newMemberNickName = await getNickName(data[0].memberId);

  setCurMembers((prev) => {
    if (prev.some((member) => member.socketId === newMemberSocketId)) {
      return prev;
    }
    const newMember = {
      socketId: newMemberSocketId,
      memberId: data[0].memberId,
      nickname: newMemberNickName,
    };
    return [...prev, newMember];
  });
};

export const handleMessage = async (
  data: ChattingInfo,
  setChattingList: Dispatch<SetStateAction<ChattingInfo[]>>,
) => {
  const curNickname = await getNickName(data.memberId);
  const dataWithNickname = {
    memberId: data.memberId,
    message: data.message,
    time: data.time,
    nickname: curNickname,
  };
  setChattingList((prev: ChattingInfo[]) => [...prev, dataWithNickname]);
};

export const handleConsumerClosed = (
  data: ConsumerId,
  removeStream: (consumer_id: string) => void,
) => {
  removeStream(data.consumer_id);
};
