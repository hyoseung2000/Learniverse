import { styled } from 'styled-components';

import { CancelButton, ConfirmButton } from '../Common/Button';
import { LargeModal } from '../Common/Modal';

interface AddStudyroomModalProps {
  isShowing: boolean;
  handleCancel: () => void;
}

const AddStudyroomModal = ({
  isShowing,
  handleCancel,
}: AddStudyroomModalProps) => {
  const handleAddRoom = () => {};

  return (
    isShowing && (
      <StAddStudyroomModalWrapper>
        <LargeModal title="스터디룸 만들기" isShowing={isShowing}>
          스터디명
          <StBtnWrapper>
            <ConfirmButton btnName="만들기" onClick={handleAddRoom} />
            <CancelButton btnName="취소" onClick={handleCancel} />
          </StBtnWrapper>
        </LargeModal>
      </StAddStudyroomModalWrapper>
    )
  );
};

export default AddStudyroomModal;

const StAddStudyroomModalWrapper = styled.div``;

const StBtnWrapper = styled.div``;
