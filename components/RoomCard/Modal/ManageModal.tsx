import { styled } from "styled-components";

import { CancelButton, ConfirmButton } from "@/components/Common/Button";
import { SmallModal } from "@/components/Common/Modal";

interface CompleteModalProps {
  isShowing: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
}

const ManageModal = ({
  isShowing,
  handleConfirm,
  handleCancel,
}: CompleteModalProps) => {
  return (
    <>
      {isShowing && (
        <>
          <SmallModal title="신청자 관리하기" isShowing={isShowing}>
            <StManageModalWrapper>
              <p>닉네임</p>
              <p>깃허브 아이디</p>
              <p>승인상태</p>
            </StManageModalWrapper>
            <StBtnWrapper>
              <ConfirmButton btnName="완료" onClick={handleConfirm} />
              <CancelButton btnName="취소" onClick={handleCancel} />
            </StBtnWrapper>
          </SmallModal>
        </>
      )}
    </>
  );
};

export default ManageModal;

const StManageModalWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;

  padding: 1.3rem 2.7rem 0.8rem 2.7rem;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  margin-bottom: 1.3rem;
`;
