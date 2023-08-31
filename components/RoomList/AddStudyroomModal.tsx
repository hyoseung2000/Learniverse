import { styled } from 'styled-components';

import { LargeModal } from '../Common/Modal';

interface AddStudyroomModalProps {
  isShowing: boolean;
  handleCancel: () => void;
}

const AddStudyroomModal = ({
  isShowing,
  handleCancel,
}: AddStudyroomModalProps) => {
  return (
    isShowing && (
      <StAddStudyroomModalWrapper>
        <LargeModal
          title="스터디룸 만들기"
          isShowing={isShowing}
          handleConfirm={handleCancel}
          handleCancel={handleCancel}
        ></LargeModal>
      </StAddStudyroomModalWrapper>
    )
  );
};

export default AddStudyroomModal;

const StAddStudyroomModalWrapper = styled.div``;
