import { styled } from 'styled-components';

import { IcAddStudyRoom } from '@/public/assets/icons';

const AddStudyroom = () => {
  return (
    <StAddStudyroomWrapper>
      <IcAddStudyRoom />
      스터디룸 생성
    </StAddStudyroomWrapper>
  );
};

export default AddStudyroom;

const StAddStudyroomWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  width: 14.1rem;
  height: 18.6rem;

  border-radius: 1.6rem;
  box-shadow: 2.79591px 2.79591px 5.59181px 3.49488px rgba(0, 0, 0, 0.24);
  background: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Title5};
`;
