import { styled } from 'styled-components';

import { IcCancel } from '@/public/assets/icons';

import { StConfirmButtonWrapper } from './ConfirmButton';

interface CancelButtonProps {
  btnName: string;
  onClick: () => void;
}

const CancelButton = ({ btnName, onClick }: CancelButtonProps) => {
  return (
    <StCancelButtonWrapper type="button" onClick={onClick}>
      <IcCancel />
      {btnName}
    </StCancelButtonWrapper>
  );
};

export default CancelButton;

const StCancelButtonWrapper = styled(StConfirmButtonWrapper)`
  background-color: ${({ theme }) => theme.colors.Orange2};
`;
