import { Dispatch, SetStateAction, useState } from 'react';

import { ChattingInfo, CustomSocket } from '@/types/socket';
import { getNickName } from '@/utils/getNicknames';
import { getTime } from '@/utils/getTime';

type UseChatHandlerReturnType = [
  string,
  Dispatch<SetStateAction<string>>,
  () => void,
];

const useChatHandler = (
  curSocket: CustomSocket,
  addChattingList: (chat: ChattingInfo) => void,
  name: number,
): UseChatHandlerReturnType => {
  const [chatting, setChatting] = useState<string>('');

  const getUserNickname = async (memberId: string) => {
    const nickname = await getNickName(memberId);
    return nickname;
  };

  const handleSendChatting = async (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      if (!curSocket || !chatting) {
        reject(new Error('Socket not available or no message provided.'));
        return;
      }

      curSocket.emit('message', chatting);

      const userNick = await getUserNickname(name.toString());
      const sentChat: ChattingInfo = {
        name: userNick,
        message: chatting,
        time: getTime(new Date()),
      };
      addChattingList(sentChat);
      setChatting('');
      resolve();
    });
  };

  return [chatting, setChatting, handleSendChatting];
};

export default useChatHandler;
