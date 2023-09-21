import { Dispatch, SetStateAction, useState } from 'react';

import { ChattingInfo, CustomSocket } from '@/types/socket';
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

  const handleSendChatting = () => {
    if (!curSocket) return;

    curSocket.emit('message', chatting);
    const sentChat: ChattingInfo = {
      name: name.toString(),
      message: chatting,
      time: getTime(new Date()),
    };
    addChattingList(sentChat);
    setChatting('');
  };

  return [chatting, setChatting, handleSendChatting];
};

export default useChatHandler;
