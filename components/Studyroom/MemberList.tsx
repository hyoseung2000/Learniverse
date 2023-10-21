import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getRoomMembers } from '@/apis/memberList';
import { getRoomInfo } from '@/apis/studyroom';
import { IcChar, IcRoomLogo } from '@/public/assets/icons';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { MemberInfo } from '@/types/member';
import { StudyRoomInfo } from '@/types/studyroom';
import { getCategoryColor } from '@/utils/getCategoryColor';

const MemberList = () => {
  const roomId = useRecoilValue(roomIdState);
  const memberId = useRecoilValue(memberIdState);

  const [memberList, setMemberList] = useState<MemberInfo[]>();
  const [rname, setRName] = useState<string>('');
  const [rcategory, setRCategory] = useState<string>('');
  const planetColor = getCategoryColor(rcategory);
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMessage] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const getRoomName = async () => {
    const roomInfo: StudyRoomInfo = await getRoomInfo(roomId, memberId);
    const { roomName, roomCategory } = roomInfo;

    setRName(roomName);
    setRCategory(roomCategory);
  };
  const getMembers = async () => {
    const members = await getRoomMembers(roomId);
    setMemberList(members);
  };
  const handleMessage = (memberMessage: string) => {
    setMessage(memberMessage);
    setIsShowing(true);
    setTimeout(() => {
      setIsShowing(false);
      setMessage('');
    }, 2000);
  };

  useEffect(() => {
    getRoomName();
    getMembers();
  }, []);

  return (
    <StMembersWrapper>
      <StTitleWrapper $planetColor={planetColor}>
        <IcRoomLogo />
        <h1>{rname}</h1>
      </StTitleWrapper>
      <StMemberWrapper>
        {memberList &&
          memberList.map((member) => (
            <StMember className="member" key={member.memberId}>
              <IcChar />
              <button
                type="button"
                onClick={(event) => {
                  const eventTarget = event.target as HTMLButtonElement;
                  const position = eventTarget.getBoundingClientRect();
                  setX(position.x - 10);
                  setY(position.y);
                  handleMessage(member.memberMessage);
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
      </StMemberWrapper>
    </StMembersWrapper>
  );
};

export default MemberList;

const StMembersWrapper = styled.div`
  margin: 2rem 2.2rem;
`;

const StMember = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 1rem;

  & > button {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StTitleWrapper = styled.div<{ $planetColor: string }>`
  display: flex;
  align-items: center;

  & > svg {
    path {
      fill: ${({ $planetColor }) => $planetColor};
    }
  }

  & > h1 {
    margin-left: 1.5rem;
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StMemberWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);

  margin-top: 2rem;
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

  position: fixed;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y} px`};
`;
