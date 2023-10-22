import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

import { deleteNotice, modifyNotice } from '@/apis/studyroom';
import {
  CancelButton,
  ConfirmButton,
  DeleteButton,
} from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import { roomIdState } from '@/recoil/atom';
import { ModifyNoticeInfo, NoticeInfo } from '@/types/studyroom';

interface Props {
  isShowing: boolean;
  noticeInfo: NoticeInfo;
  handleCancel: () => void;
}

const ModifyNoticeModal = ({ isShowing, noticeInfo, handleCancel }: Props) => {
  const { memberId, boardId, title, content, createdDate } = noticeInfo;

  const [ntitle, setNTitle] = useState('');
  const [ncontent, setNContent] = useState('');
  const [update, setUpdate] = useState<Date>();
  const [noticeData, setNoticeData] = useState<ModifyNoticeInfo>();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const roomID = useRecoilValue(roomIdState);

  const handleModify = async () => {
    await modifyNotice(noticeData!);
    mutate(`/room/boards?roomId=${roomID}`);
    handleCancel();
  };

  const handleDelete = async () => {
    await deleteNotice(boardId);
    mutate(`/room/boards?roomId=${roomID}`);
    handleCancel();
  };

  const initData = () => {
    setNTitle(title);
    setNContent(content);
  };

  const handleInputHeight = () => {
    if (inputRef && inputRef.current && inputRef.current.scrollHeight < 10) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}rem`;
    }
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    setUpdate(new Date());
    setNoticeData({
      memberId,
      roomId: roomID,
      boardId,
      title: ntitle,
      content: ncontent,
      createdDate,
      updatedDate: update!,
    });
  }, [ntitle, ncontent]);

  return (
    isShowing && (
      <LargeModal title="스터디룸 공지 작성하기" isShowing={isShowing}>
        <StNoticeModalWrapper>
          <StInputWrapper>
            <StInput>
              <p>제목</p>
              <input
                type="text"
                value={ntitle}
                placeholder="제목을 입력하세요."
                onChange={(e) => {
                  setNTitle(e.target.value);
                }}
              />
            </StInput>
            <StInput>
              <p>내용</p>
              <textarea
                value={ncontent}
                ref={inputRef}
                placeholder="내용을 입력하세요."
                onKeyDown={handleInputHeight}
                onKeyUp={handleInputHeight}
                onChange={(e) => {
                  setNContent(e.target.value);
                }}
              />
            </StInput>
          </StInputWrapper>

          <StBtnWrapper>
            <ConfirmButton btnName="수정하기" onClick={handleModify} />
            <DeleteButton btnName="삭제하기" onClick={handleDelete} />
            <CancelButton
              btnName="취소"
              onClick={() => {
                initData();
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StNoticeModalWrapper>
      </LargeModal>
    )
  );
};

export default ModifyNoticeModal;

const StNoticeModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.5rem 6.4rem;
`;

const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title4};
  }

  & > input {
    margin: 1.2rem;
    width: 32.6rem;
    height: 3.2rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};
  }

  & > input:invalid {
    border: 0.3rem solid ${({ theme }) => theme.colors.Orange2};
  }

  & > textarea {
    margin: 1.2rem;
    width: 32.6rem;
    height: 10rem;

    border-radius: 0.4rem;
    border: 0.2rem solid ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.White};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
