import { styled } from 'styled-components';

import { IcPlusBtn } from '@/public/assets/icons';

import { FigmaBtn, GDriveBtn, GithbBtn, NotnBtn } from '../Common/Button';

const WorkSpace = () => {
  return (
    <StWorkspaceWrapper>
      <StTitleWrapper>
        <h2>워크 스페이스</h2>
        <IcPlusBtn />
      </StTitleWrapper>
      <Workspace>
        <NotnBtn />
        <GDriveBtn />
        <GithbBtn />
        <FigmaBtn />
      </Workspace>
    </StWorkspaceWrapper>
  );
};

export default WorkSpace;

const StWorkspaceWrapper = styled.div`
  margin: 2.3rem;
`;

const StTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const Workspace = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;

  justify-items: center;
  align-items: center;

  margin-top: 3.1rem;
`;
