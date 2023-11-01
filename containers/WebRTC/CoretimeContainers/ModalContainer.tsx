import { useRouter } from 'next/router';

import { ModalWrapper } from '@/components/Common/Modal';
import { GalleryModal } from '@/components/Coretime/Gallery';
import {
  CreateIssueModal,
  DiscussIssueModal,
  IssueModal
} from '@/components/Coretime/Issue';
import {
  CaptureCompleteModal,
  CaptureModal,
  ExitCoretimeModal
} from '@/components/Coretime/Modal';
import { UseModalReturnType } from '@/hooks/Common/useModal';

interface ModalContainerProps {
  coreTimeId: number;
  issue: UseModalReturnType;
  cIssue: UseModalReturnType;
  discuss: UseModalReturnType;
  gallery: UseModalReturnType;
  exit: UseModalReturnType;
  capture: UseModalReturnType;
  captureComplete: UseModalReturnType;
  capturedImageFile: File | undefined;
  handleCapture: () => void;
  handleExitAndNavigate: () => void;
}

const ModalContainer = ({
  coreTimeId,
  issue,
  cIssue,
  discuss,
  gallery,
  exit,
  capture,
  captureComplete,
  capturedImageFile,
  handleCapture,
  handleExitAndNavigate,
}: ModalContainerProps) => {
  const router = useRouter();

  const handleCreateIssue = () => {
    issue.toggle();
    cIssue.toggle();
  };

  const handleDiscuss = () => {
    issue.toggle();
    discuss.toggle();
  };

  return (
    <>
      <ModalWrapper isShowing={issue.isShowing}>
        <IssueModal
          isShowing={issue.isShowing}
          handleClick={handleDiscuss}
          handleCreate={handleCreateIssue}
          handleCancel={issue.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={cIssue.isShowing}>
        <CreateIssueModal
          isShowing={cIssue.isShowing}
          handleCancel={cIssue.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={discuss.isShowing}>
        <DiscussIssueModal
          isShowing={discuss.isShowing}
          handleCancel={discuss.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={gallery.isShowing}>
        <GalleryModal
          coreTimeId={coreTimeId}
          isShowing={gallery.isShowing}
          handleCancel={gallery.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={exit.isShowing}>
        <ExitCoretimeModal
          isShowing={exit.isShowing}
          handleExit={() => {
            handleExitAndNavigate();
            router.push('/home');
          }}
          handleCancel={exit.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={capture.isShowing}>
        <CaptureModal
          isShowing={capture.isShowing}
          setShowing={capture.setShowing}
          imageFile={capturedImageFile!}
          handleCapture={handleCapture}
          handleCancel={capture.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={captureComplete.isShowing}>
        <CaptureCompleteModal
          isShowing={captureComplete.isShowing}
          handleConfirm={captureComplete.toggle}
        />
      </ModalWrapper>
    </>
  );
};

export default ModalContainer;
