import { styled } from 'styled-components';

import AddStudyroom from './AddStudyroom';
import StudyroomCard from './StudyroomCard';

const StudyroomList = () => {
  return (
    <StStudyroomListWrapper>
      <AddStudyroom />
      <StudyroomCard />
      <StudyroomCard />
      <StudyroomCard />
      <StudyroomCard />
      <StudyroomCard />
      <StudyroomCard />
      <StudyroomCard />
      <StudyroomCard />
    </StStudyroomListWrapper>
  );
};

export default StudyroomList;

const StStudyroomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 8.4rem;
  margin-bottom: 8rem;
`;
