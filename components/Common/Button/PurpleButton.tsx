import { styled } from 'styled-components';

interface PurpleButtonProps {
  btnName: string;
  handleClick: () => void;
}

const PurpleButton = ({ btnName, handleClick }: PurpleButtonProps) => {
  return (
    <StPurpleButtonWrapper type="button" onClick={handleClick}>
      {btnName}
    </StPurpleButtonWrapper>
  );
};

export default PurpleButton;

const StPurpleButtonWrapper = styled.button`
  padding: 1rem 3rem;

  border-radius: 100rem;
  background-color: ${({ theme }) => theme.colors.Purple3};
  box-shadow: 2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title4};
`;
