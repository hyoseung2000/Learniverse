import { useState } from 'react';
import { styled } from 'styled-components';

import { IcChar } from '@/public/assets/icons';
import { MemberInfo } from '@/types/member';
import { RoomPeerInfo } from '@/types/socket';

interface MemberMessageListProps {
  memberList: RoomPeerInfo[] | MemberInfo[];
}

const MemberMessageList = ({ memberList }: MemberMessageListProps) => {
  const [visibleMemberId, setVisibleMemberId] = useState<number | null>(null);

  const uniqueMemberList = memberList.filter(
    (member, index, self) =>
      index === self.findIndex((m) => m.memberId === member.memberId),
  );

  const toggleMessageVisibility = (memberid: number) => {
    setVisibleMemberId((prevVisibleMemberId) =>
      prevVisibleMemberId === memberid ? null : memberid,
    );
  };

  return (
    <StMemberWrapper>
      {uniqueMemberList &&
        uniqueMemberList.map((member) => (
          <StMember
            className="member"
            key={member.memberId}
            onClick={() => toggleMessageVisibility(member.memberId)}
          >
            <IcChar />
            {member.nickname}
            {visibleMemberId === member.memberId && member.memberMessage && (
              <StMessage>
                <p>{member.memberMessage}</p>
              </StMessage>
            )}
            {visibleMemberId === member.memberId && member.message && (
              <StMessage>
                <p>{member.message}</p>
              </StMessage>
            )}
          </StMember>
        ))}
    </StMemberWrapper>
  );
};

export default MemberMessageList;

const StMemberWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const StMember = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title5};

  cursor: pointer;
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
