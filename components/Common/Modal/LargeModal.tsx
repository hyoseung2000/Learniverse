import React from 'react';
import { styled } from 'styled-components';

interface LargeModalProps {
  title: string;
  isShowing: boolean;
  children: React.ReactNode;
}

const LargeModal = ({ title, isShowing, children }: LargeModalProps) => {
  return (
    isShowing && (
      <StLargeModalWrapper>
        <StTitle>{title}</StTitle>
        {children}
      </StLargeModalWrapper>
    )
  );
};

export default LargeModal;

const StLargeModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 60.1rem;
  height: fit-content;

  border-radius: 2rem;
  box-shadow:
    0px 4px 100px 0px rgba(153, 133, 254, 0.2) inset,
    -30px 30px 100px 0px rgba(132, 139, 227, 0.15);
  background-color: ${({ theme }) => theme.colors.LightGray1};
`;

const StTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5.6rem;

  border-radius: 2rem 2rem 0 0;
  background-color: ${({ theme }) => theme.colors.Purple4};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title1};
`;
