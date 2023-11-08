import { styled } from 'styled-components';

import { RoomPeerInfo } from '@/types/socket';

import MemberMessageList from '../../Studyroom/MemberMessageList';

interface MembersProps {
  curMembers: RoomPeerInfo[];
}

const Member = ({ curMembers }: MembersProps) => {
  return (
    <StMemberWrapper>
      <h3>현재 접속 중</h3>
      <StMembers>
        <MemberMessageList memberList={curMembers} />
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
  padding: 1rem 1rem 0 1rem;
`;
