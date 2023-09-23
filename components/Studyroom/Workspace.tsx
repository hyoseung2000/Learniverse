import { styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { IcPlusBtn } from '@/public/assets/icons';

import { FigmaBtn, GDriveBtn, GithbBtn, NotnBtn } from '../Common/Button';
import RegisterWorkspaceModal from './Modal/RegisterWorkspaceModal';

const WorkSpace = () => {
  // const [workSpace, setWorkSpace] = useState([]);
  const register = useModal();

  const handleOpen = () => {
    register.toggle();
  };

  const handleWSAddress = () => {
    window.open(
      'https://www.notion.so/000208/Learniverse-3f06d9d94f3a4540a036c1070926c8ef',
    );
  };

  return (
    <>
      <StWorkspaceWrapper>
        <StTitleWrapper>
          <h2>워크 스페이스</h2>
          <IcPlusBtn type="button" onClick={handleOpen} />
        </StTitleWrapper>
        <Workspace>
          <NotnBtn key={0} handleClick={handleWSAddress} />
          <GDriveBtn key={1} handleClick={handleWSAddress} />
          <GithbBtn key={2} handleClick={handleWSAddress} />
          <FigmaBtn key={3} handleClick={handleWSAddress} />
        </Workspace>
      </StWorkspaceWrapper>
      <StRegModalWrapper $showing={register.isShowing}>
        <RegisterWorkspaceModal
          isShowing={register.isShowing}
          handleCancel={register.toggle}
        />
      </StRegModalWrapper>
    </>
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

  cursor: pointer;
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

const StRegModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
