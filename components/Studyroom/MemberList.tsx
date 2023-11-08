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
  const [isMessageShowing, setIsMessageShowing] = useState(false);

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
              {member.nickname}
              {member.memberMessage && (
                <StMessage>
                  <p>{member.memberMessage}</p>
                </StMessage>
              )}
            </StMember>
          ))}
      </StMemberWrapper>
    </StMembersWrapper>
  );
};

export default MemberList;

const StMembersWrapper = styled.div`
  margin: 2rem 2.2rem;
`;

const StMember = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title5};
`;

const StMessage = styled.div`
  position: absolute;
  top: 0rem;
  left: 4rem;

  z-index: 1;

  width: fit-content;
  height: 2rem;
  padding: 1rem 2rem;

  background: rgba(255, 255, 255, 0.9);
  border-radius: 2rem;
  text-align: center;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body2};
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
