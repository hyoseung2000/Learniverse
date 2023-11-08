import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getRoomMembers } from '@/apis/memberList';
import { getRoomInfo } from '@/apis/studyroom';
import { IcRoomLogo } from '@/public/assets/icons';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { MemberInfo } from '@/types/member';
import { StudyRoomInfo } from '@/types/studyroom';
import { getCategoryColor } from '@/utils/getCategoryColor';

import MemberMessageList from './MemberMessageList';

const MemberList = () => {
  const roomId = useRecoilValue(roomIdState);
  const memberId = useRecoilValue(memberIdState);

  const [memberList, setMemberList] = useState<MemberInfo[]>();
  const [rname, setRName] = useState<string>('');
  const [rcategory, setRCategory] = useState<string>('');
  const planetColor = getCategoryColor(rcategory);

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
      {memberList && <MemberMessageList memberList={memberList} />}
    </StMembersWrapper>
  );
};

export default MemberList;

const StMembersWrapper = styled.div`
  margin: 2rem 2.2rem;
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
    margin: 0 0 1rem 1.5rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;
