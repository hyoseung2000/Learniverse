import { styled } from 'styled-components';

interface Props {
  btnName: string;
}

const CoreBtn = ({ btnName }: Props) => {
  return (
    <StCoreBtnWrapper>
      <p>{btnName}</p>
    </StCoreBtnWrapper>
  );
};

export default CoreBtn;

const StCoreBtnWrapper = styled.button`
  width: 18.5rem;
  height: 5.6rem;
  margin-left: 2.5rem;

  background: ${({ theme }) => theme.colors.Purple3};

  box-shadow: 2.4px 4.3px 3.7px 1.2px rgba(0, 0, 0, 0.15);
  border-radius: 2.5rem;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title2};
  }
`;
