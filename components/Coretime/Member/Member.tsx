import { useState } from 'react';
import { styled } from 'styled-components';

import { IcChar } from '@/public/assets/icons';
import { RoomPeerInfo } from '@/types/socket';

interface MembersProps {
  curMembers: RoomPeerInfo[];
}

const Member = ({ curMembers }: MembersProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  console.log('curMembers', curMembers);

  const handleMessage = (memberMessage: string) => {
    setMessage(memberMessage);
    setIsShowing(true);
    setTimeout(() => {
      setIsShowing(false);
      setMessage('');
    }, 2000);
  };

  return (
    <StMemberWrapper>
      <h3>현재 접속 중</h3>
      <StMembers>
        {curMembers.map((member) => (
          <StMember key={member.socketId}>
            <IcChar />
            <button
              type="button"
              onClick={(event) => {
                const eventTarget = event.target as HTMLButtonElement;
                const position = eventTarget.getBoundingClientRect();
                setX(position.x - 10);
                setY(position.y);
                handleMessage(member.message!);
              }}
            >
              {member.nickname}
            </button>
          </StMember>
        ))}
        {isShowing && message && (
          <StMessage x={x} y={y}>
            <p>{message}</p>
          </StMessage>
        )}
      </StMembers>
    </StMemberWrapper>
  );
};

export default Member;

const StMemberWrapper = styled.div`
  position: relative;

  width: 100%;
  height: fit-content;
  padding: 1.8rem;
  margin-bottom: 2.4rem;
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

const StMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;

  padding: 1rem 1rem 0 1rem;
`;

const StMember = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > button {
    ${({ theme }) => theme.fonts.Title5};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StMessage = styled.div<{ x: number; y: number }>`
  width: fit-content;
  height: 2rem;
  z-index: 1000;

  text-align: center;
  align-items: center;

  padding: 0 1rem;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body4};
  }

  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 1rem;

  position: absolute;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y} px`};
`;
