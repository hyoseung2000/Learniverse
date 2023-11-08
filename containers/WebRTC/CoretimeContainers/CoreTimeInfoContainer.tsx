/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { Chatting } from '@/components/Coretime/Chatting';
import { Member } from '@/components/Coretime/Member';
import { UseModalReturnType } from '@/hooks/Common/useModal';
import { useChatHandler } from '@/hooks/Socket';
import { memberIdState } from '@/recoil/atom';
import { ChattingInfo, CustomSocket, RoomPeerInfo } from '@/types/socket';
import { getNickName } from '@/utils/getNicknames';

interface CoreTimeInfoContainerProps {
  curSocket: CustomSocket | null;
  curMembers: RoomPeerInfo[];
  chattingList: ChattingInfo[];
  addChattingList: (chat: ChattingInfo) => void;
  exit: UseModalReturnType;
}

const CoreTimeInfoContainer = ({
  curSocket,
  curMembers,
  chattingList,
  addChattingList,
  exit,
}: CoreTimeInfoContainerProps) => {
  const curMemberId = useRecoilValue(memberIdState);
  const [uniqueMembers, setUniqueMembers] = useState<RoomPeerInfo[]>([]);
  const [curNickname, setCurNickname] = useState('');
  const [chatting, setChatting, handleSendChatting] = useChatHandler(
    curSocket!,
    curMemberId,
    curNickname!,
    addChattingList,
  );
  const [isSending, setIsSending] = useState(false);

  const setNickname = async () => {
    const nickname = await getNickName(curMemberId!);
    setCurNickname(nickname);
  };

  const handleChatSend = async () => {
    if (isSending) return;
    setIsSending(true);
    await handleSendChatting();
    setIsSending(false);
  };

  useEffect(() => {
    setNickname();
  }, [curMemberId]);

  useEffect(() => {
    const unique = curMembers.filter(
      (member, index, self) =>
        index === self.findIndex((m) => m.memberId === member.memberId),
    );

    setUniqueMembers(unique);
  }, [curMembers]);

  return (
    <StCoretimeInfoWrapper>
      <Member curMembers={uniqueMembers} />
      <StChattingWrapper>
        <Chatting curNickname={curNickname} chattingList={chattingList} />
        <StChatInputWrapper>
          <StChatInput
            type="text"
            placeholder="메시지를 입력하세요."
            value={chatting || ''}
            onChange={(e) => setChatting(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && chatting.trim()) {
                e.preventDefault();
                handleChatSend();
              }
            }}
          />
          <button type="button" onClick={handleSendChatting}>
            전송
          </button>
        </StChatInputWrapper>
      </StChattingWrapper>
      <StCoreTimeBtnWrapper>
        <StExitButton type="button" onClick={exit.toggle}>
          코어타임 나가기
        </StExitButton>
      </StCoreTimeBtnWrapper>
    </StCoretimeInfoWrapper>
  );
};

export default CoreTimeInfoContainer;

const StCoretimeInfoWrapper = styled.section`
  width: 100%;

  box-sizing: border-box;
  padding: 2rem 6.5rem 2rem 2rem;
`;

const StChattingWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 33.9rem;
  padding: 1.8rem;
  box-sizing: border-box;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 38.14%,
    rgba(238, 238, 250, 0.03) 128.32%
  );

  & > h3 {
    padding: 0 1rem 1rem 2rem;

    ${({ theme }) => theme.fonts.Title1};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 4rem;

  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.colors.White};

  & > button {
    box-sizing: border-box;
    padding: 0.5rem 1rem;

    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.Learniverse_BG};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInput = styled.input`
  width: 75%;
  padding: 0.7rem 2rem;
  ${({ theme }) => theme.fonts.Body1};
`;

const StCoreTimeBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  padding-top: 3rem;
`;

const StExitButton = styled.button`
  padding: 1.2rem 7.6rem;

  border-radius: 100rem;
  background-color: ${({ theme }) => theme.colors.Purple3};
  box-shadow: 2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title2};
`;
