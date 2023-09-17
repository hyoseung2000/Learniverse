import { styled } from 'styled-components';

import { IcChar, IcRoomLogo } from '@/public/assets/icons';

const MemberList = () => {
  return (
    <StMembersWrapper>
      <StTitleWrapper>
        <IcRoomLogo />
        <h1>소웨5공주 공부방</h1>
      </StTitleWrapper>
      <StMemberWrapper>
        <StMember>
          <IcChar />
          <p>코딩천사 선영이</p>
        </StMember>
        <StMember>
          <IcChar />
          <p>유지니</p>
        </StMember>
        <StMember>
          <IcChar />
          <p>100지민</p>
        </StMember>
        <StMember>
          <IcChar />
          <p>효승이</p>
        </StMember>
        <StMember>
          <IcChar />
          <p>iamphj3</p>
        </StMember>
      </StMemberWrapper>
    </StMembersWrapper>
  );
};

export default MemberList;

const StMembersWrapper = styled.div`
  margin: 3.3rem;
`;

const StMember = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 1rem;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StTitleWrapper = styled.div`
  display: flex;
  align-items: center;

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
`;
